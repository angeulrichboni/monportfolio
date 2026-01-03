# Spécification d'intégration Frontend ↔ Backend

Version: 1.0
Date: 2025-12-21

## Objectif
- Fournir aux ingénieurs backend une spécification complète et exploitable pour implémenter le service de traduction / proxy nécessaire au front.
- Décrire les attentes du front (`TranslatableInput`), les types attendus, les endpoints recommandés, les schémas Zod/TypeScript, la gestion d'erreurs, le caching et les recommandations de sécurité.

## Contexte
- Le front stocke les textes multilingues sous la forme d'objets `LocalizedString` :

```ts
export interface LocalizedString { fr: string; en: string }
```

- Les composants administratifs utilisent `TranslatableInput` (dans `src/admin/components/ui/TranslatableInput.tsx`) qui permet :
  - Saisie FR/EN
  - Bouton "AI Translate" qui appelle `translateText` (service client) pour générer la traduction automatique
  - Comportement attendu : si l'utilisateur écrit en FR puis clique "AI Translate", le champ EN reçoit la traduction et l'onglet EN peut s'afficher pour vérification.

## Recommandation de sécurité (fortement recommandée)
- Ne pas exposer la clé API externe côté client. Mettre en place un endpoint proxy côté serveur (backend) qui stocke `GROQ_API_KEY` ou équivalent dans les variables d'environnement serveur.
- Le front appellera `POST /api/translate` (backend) qui appellera ensuite l'API tierce (Groq / modèle LLM).

## Endpoint recommandé (proxy)

- URL : `POST /api/translate`
- Auth : token JWT (ou session), header `Authorization: Bearer <token>` — selon l'auth existante.
- Rate limiting : limiter par IP/API key selon la politique d'usage.

### Request

```json
POST /api/translate
Content-Type: application/json

{
  "text": "analyse du trafic",
  "sourceLang": "fr",
  "targetLang": "en",
  "model": "llama-3.3-70b-versatile" // optionnel, fallback côté serveur
}
```

### Response 200

```json
{
  "translated": "Traffic analysis",
  "model": "llama-3.3-70b-versatile",
  "raw": { }
}
```

### Response erreurs (exemples)
- 400 Bad Request : payload invalide
- 401 Unauthorized : pas authentifié
- 429 Too Many Requests : rate limit atteint (inclure Retry-After)
- 502/503 : upstream failure (backoff recommandé)

## Types TypeScript attendus (frontend)

```ts
// types.ts (extraits)
export interface LocalizedString { fr: string; en: string }

export interface Education {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  start_year: number;
  end_year: number;
  description: LocalizedString;
}

export interface Experience {
  id: string;
  title: LocalizedString;
  company: string;
  description: LocalizedString;
  start_date: string;
  end_date?: string | null;
  technologies: string[];
}

export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  problem_statement?: LocalizedString;
  architecture?: LocalizedString;
}
```

## Zod / Validation côté backend
- Pour la route `/api/translate` :

```ts
import { z } from 'zod';

const translateSchema = z.object({
  text: z.string().min(1),
  sourceLang: z.enum(['fr','en']).optional(),
  targetLang: z.enum(['fr','en']),
  model: z.string().optional()
});
```

## Appel vers le fournisseur LLM (exemple Node.js pseudo-code)

```ts
// server/controllers/translate.ts
export async function handleTranslate(req, res) {
  const { text, targetLang, model } = req.body;
  const usedModel = model || process.env.GROQ_DEFAULT_MODEL || 'llama-3.1-8b-instant';

  const messages = [
    { role: 'system', content: `You are a professional translator. Translate to ${targetLang === 'en' ? 'English' : 'French'} and return only the translation.` },
    { role: 'user', content: text }
  ];

  const completion = await groq.chat.completions.create({ model: usedModel, messages });
  const translated = completion.choices?.[0]?.message?.content?.trim() || '';
  res.json({ translated, model: usedModel, raw: completion });
}
```

## Comportement attendu côté front
- `TranslatableInput` :
  - `lang` est l'onglet courant ('fr' ou 'en').
  - Quand utilisateur clique "AI Translate" :
    1. Lire `value[lang]` (texte source)
    2. Appeler `POST /api/translate` avec `sourceLang=lang` et `targetLang` inverse
    3. Si succès : updater `value[targetLang]` avec `translated` et (optionnel) switcher l'onglet vers `targetLang` pour vérification
    4. Afficher état loading et erreurs (toast)

- Sauvegarde : l'utilisateur doit explicitement `Save`. Tant que non sauvegardé, les données ne sont pas persistées.

## Exemples: front → backend flow

1. Admin écrit en FR : `value.fr = 'analyse du trafic'`.
2. Clique `AI Translate` → front POST `/api/translate` → backend appelle LLM → backend renvoie `{ translated: 'Traffic analysis' }`.
3. Front met `value.en = 'Traffic analysis'` et affiche.
4. Admin clique `Save` → front envoie l'objet complet `{ institution: { fr, en }, ... }` au backend API de sauvegarde.

## Gestion d'erreurs & stratégies
- Si l'API de traduction retourne la même chaîne que la source (pas de changement), considérer :
  - Vérifier la réponse brute (`raw`) pour message d'erreur
  - Afficher un toast : "Aucune traduction générée — vérifier la clé ou les quotas"

- Retry/backoff : pour `5xx` ou `network` faire 3 tentatives avec backoff exponentiel (100ms → 500ms → 2000ms) et renvoyer 429 tel quel en incluant `Retry-After` si fourni.

- Caching : conserver en mémoire côté serveur les traductions récentes (clé = sha256(text+targetLang+model)) TTL recommandé 24h. Cela économise tokens et accélère l'UI.

## Observabilité
- Logs :
  - `translate.request` : source length, targetLang, model, userId
  - `translate.response` : success/fail, latency_ms, token usage (si disponible)
  - `translate.error` : statut et payload complet (sanitized)

- Metrics à exposer (Prometheus):
  - `translate_requests_total{model,targetLang}`
  - `translate_errors_total{reason}`
  - `translate_latency_seconds_bucket`

## Sécurité & bonnes pratiques
- Stocker `GROQ_API_KEY` (ou clé de fournisseur) en variable d'environnement server-side (ex: `GROQ_API_KEY`).
- Ne pas utiliser `dangerouslyAllowBrowser: true` en production — c'est uniquement pour développement local.
- Limiter la taille du texte côté front (ex: 4k chars) et côté backend vérifier `Content-Length`.

## Politiques de modèle (choix)
- Par défaut côté serveur proposer `llama-3.1-8b-instant` pour latence et coût.
- Permettre override via `VITE_GROQ_MODEL` (ou variable server-side `GROQ_DEFAULT_MODEL`) pour tests et montée en qualité (`llama-3.3-70b-versatile`) lorsque nécessaire. Documenter les coûts et limites (tokens, rate limits).

## Contrats de sauvegarde (exemple body pour sauvegarde d'une `Education`)

```json
POST /api/admin/education
{
  "institution": { "fr": "Université...", "en": "University..." },
  "degree": { "fr": "M1...", "en": "MSc..." },
  "start_year": 2020,
  "end_year": 2023,
  "description": { "fr": "...", "en": "..." }
}
```

## Recommandations DB
- Stocker `LocalizedString` en JSON (Postgres `jsonb`) :
  - `institution jsonb`, `degree jsonb`, `description jsonb`
- Indexation : indexer les champs de recherche nécessaires, p.ex. `institution->> 'en'` si on cherche en anglais.

## Tests recommandés
- Unit tests pour le contrôleur `/api/translate` :
  - Cas succès (retourne traduction)
  - Cas clé invalide (simuler upstream 401)
  - Cas rate limit upstream (429) → vérifier que on renvoie 429 ou applique backoff
  - Cas texte vide → 400

- E2E : simuler le flow complet front → /api/translate → sauvegarde et lecture.

## Annexe : schémas Zod (extraits)

```ts
import { z } from 'zod';

export const localizedStringSchema = z.object({ fr: z.string().min(1), en: z.string().min(1) });

export const educationSchema = z.object({
  id: z.string().optional(),
  institution: localizedStringSchema,
  degree: localizedStringSchema,
  start_year: z.number().int(),
  end_year: z.number().int(),
  description: localizedStringSchema
});
```

## Points d'attention
- Sur les textes courts (titres), la traduction automatique peut renvoyer la même chaîne si le modèle juge que c'est déjà en anglais (ou si prompt/model mal configuré). Toujours afficher la réponse brute pour debug.
- Gérer correctement l'encodage (utf-8) et la longueur (tronquer si nécessaire avant d'appeler le modèle).

## Contact
- Pour questions d'implémentation, contacter l'équipe frontend : `frontend@company` ou via le ticket JIRA `FRONT-BACK-TRANSLATION`.

---
Fichier lié côté front : `src/services/groq.ts` (exemple d'implémentation client). Recommanderai de déplacer l'appel dans un proxy server-side décrit ci-dessus.

## Compléments demandés par l'équipe backend

### Authentification & en-têtes
- Header attendu : `Authorization: Bearer <JWT>` (si votre stack utilise JWT) ou session cookie selon l'implémentation.
- Example middleware (Express) :

```ts
// middleware/auth.ts (pseudo)
import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization?.split(' ');
  if (!auth || auth[0] !== 'Bearer' || !auth[1]) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth[1];
  // valider le token ici, p.ex. jwt.verify(token, process.env.JWT_SECRET)
  // attacher userId: req.user = { id }
  return next();
}
```

### Format d'erreur standardisé (JSON)
Pour faciliter le front, renvoyer systématiquement un JSON :

```json
{ "error": "short_code", "message": "Readable message", "details": { /* optional */ } }
```

Mapping recommandé :
- 400 -> { error: "bad_request", message: "..." }
- 401 -> { error: "unauthorized", message: "Invalid or missing credentials" }
- 429 -> { error: "rate_limited", message: "Rate limit exceeded", details: { retryAfter: 60 } }
- 502/503 -> { error: "upstream_error", message: "Translation service unavailable" }

### Logs (champs recommandés)
- `request_id` (corrélation)
- `user_id` (si authentifié)
- `source_lang`, `target_lang`
- `text_length` (chars)
- `model`
- `upstream_status`
- `latency_ms`
- `tokens_used` (si disponible du fournisseur)
- `error_code` / `error_message`

Exemple de log structuré (JSON) :

```json
{
  "request_id": "uuid",
  "user_id": "u123",
  "source_lang": "fr",
  "target_lang": "en",
  "text_length": 42,
  "model": "llama-3.3-70b-versatile",
  "upstream_status": 200,
  "latency_ms": 320,
  "tokens_used": 120
}
```

### Métriques Prometheus (noms et labels suggérés)
- `translate_requests_total{model, target_lang}`
- `translate_errors_total{model, reason}`
- `translate_latency_seconds` (histogram)
- `translate_tokens_total{model}`

### Politique de rate-limit (valeurs suggérées)
- Rate limit global par utilisateur : 60 req / minute
- Burst par IP : 120 req / minute avec window sliding
- For upstream 429, propager 429 au front avec `Retry-After` indiqué

### Note sur le comptage de tokens
- Certains fournisseurs renvoient `usage` dans la réponse (input_tokens, output_tokens). Si disponible, agréger ces valeurs et exposer `translate_tokens_total`.
- Si le fournisseur ne renvoie pas d'usage, estimer tokens via heuristique (par ex. 1 token ≈ 4 caractères pour textes européens), mais documenter l'imprécision.

### Exemple d'implémentation Express (prototype)

```ts
// server/src/routes/translate.ts
import express from 'express';
import { z } from 'zod';
import NodeCache from 'node-cache';
import groq from 'groq-sdk';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // 24h

const schema = z.object({ text: z.string().min(1), sourceLang: z.string().optional(), targetLang: z.enum(['en','fr']), model: z.string().optional() });

router.post('/', requireAuth, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'bad_request', message: parsed.error.message });
  const { text, targetLang, model } = parsed.data;
  const usedModel = model || process.env.GROQ_DEFAULT_MODEL || 'llama-3.1-8b-instant';

  const key = crypto.createHash('sha256').update(`${text}|${targetLang}|${usedModel}`).digest('hex');
  const cached = cache.get(key);
  if (cached) return res.json({ translated: cached, model: usedModel, cached: true });

  // Call upstream with simple retry
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const completion = await groq.chat.completions.create({ model: usedModel, messages: [ { role: 'system', content: `Translate to ${targetLang === 'en' ? 'English' : 'French'}. Return only the translation.` }, { role: 'user', content: text } ] });
      const translated = completion.choices?.[0]?.message?.content?.trim() || '';
      cache.set(key, translated);
      return res.json({ translated, model: usedModel, raw: completion });
    } catch (err: any) {
      const shouldRetry = err?.status >= 500 || err?.status === 429;
      if (!shouldRetry) return res.status(502).json({ error: 'upstream_error', message: 'Translation failed', details: err?.message });
      // small backoff
      await new Promise(r => setTimeout(r, 100 * Math.pow(2, attempt)));
    }
  }

  return res.status(502).json({ error: 'upstream_error', message: 'Translation service unavailable' });
});

export default router;
```

### Tests unitaires (exemples)
- Tester controller `POST /api/translate` :
  - Texte vide -> 400
  - Texte valide -> 200 et `translated` présent
  - Upstream 429 -> returns 429 with `Retry-After`

Exemple (Jest + Supertest) :

```ts
import request from 'supertest';
import app from '../app';

test('translate success', async () => {
  const res = await request(app).post('/api/translate').send({ text: 'bonjour', targetLang: 'en' }).set('Authorization', 'Bearer validtoken');
  expect(res.status).toBe(200);
  expect(res.body.translated).toBeDefined();
});
```

### Déploiement & secrets
- Stocker `GROQ_API_KEY` dans le vault/env du déploiement (Azure KeyVault / AWS Secrets Manager / Vercel Environment Variables).
- Ne pas commiter `.env` contenant la clé. Utiliser `.env.example` pour documentation.

---

Fin des compléments.

## Catalogue complet des endpoints nécessaires
Ci-dessous la liste complète des endpoints backend nécessaires pour que le front fonctionne (admin + public). Pour chaque endpoint : méthode, URL, auth requise, schéma requête/réponse, validations Zod et notes opérationnelles.

---

### Auth
- POST /api/auth/login
  - Auth: none
  - Body: { email: string, password: string }
  - Response 200: { token: string, user: { id, email, role } }
  - Response 401: { error: 'unauthorized', message }
  - Zod: email z.string().email(), password z.string().min(8)

- POST /api/auth/refresh
  - Auth: refresh token cookie
  - Response: { token }

- POST /api/auth/logout
  - Auth: Bearer
  - Response: 204

Notes: implémenter TTL des tokens, blacklist logout si nécessaire.

---

### Admin CRUD (Projects)
- GET /api/admin/projects
  - Auth: Bearer (admin)
  - Query: page?:number, limit?:number, q?:string, status?:string
  - Response: { items: Project[], total: number, page, limit }

- GET /api/admin/projects/:id
  - Auth: Bearer
  - Response: Project

- POST /api/admin/projects
  - Auth: Bearer
  - Body: Project payload (see Types)
  - Response 201: created project
  - Zod validation: use project schema with LocalizedString fields

- PUT /api/admin/projects/:id
  - Auth: Bearer
  - Body: partial Project update
  - Response 200

- DELETE /api/admin/projects/:id
  - Auth: Bearer
  - Response 204

Notes: support file uploads (cover image) via signed URL or separate upload endpoint (see Assets). Validate gallery items type/size.

---

### Admin CRUD (Education)
- GET /api/admin/education
- GET /api/admin/education/:id
- POST /api/admin/education
- PUT /api/admin/education/:id
- DELETE /api/admin/education/:id

Body for create/update (example):
```json
{
  "institution": { "fr":"...","en":"..." },
  "degree": { "fr":"...","en":"..." },
  "start_year": 2020,
  "end_year": 2023,
  "description": { "fr":"...","en":"..." }
}
```

Zod: see `educationSchema` in annex.

---

### Admin CRUD (Experience)
- Same as Education: `/api/admin/experience` (list, get, create, update, delete)
Body includes `title: LocalizedString`, `company`, `start_date`, `end_date`, `type`, `description: LocalizedString`, `technologies: string[]`.

---

### Admin CRUD (Skills)
- `/api/admin/skills` list/get/create/update/delete
Body: { name: string, category: string, level: number }

---

### Admin CRUD (Blog / Posts)
- `/api/admin/posts` CRUD endpoints
Body: { title: LocalizedString | string, content: string, published: boolean, slug?: string }

---

### Public endpoints (read-only)
- GET /api/projects
  - Query: page, limit, q, category, status
  - Response: { items: ProjectSummary[], total }

- GET /api/projects/:id
  - Response: full Project

- GET /api/education
- GET /api/education/:id
- GET /api/experience
- GET /api/experience/:id
- GET /api/skills
- GET /api/posts
- GET /api/posts/:slug

Notes: cache public GETs (CDN, Varnish, or server-side cache); use ETag/Last-Modified for efficient invalidation.

---

### Assets & Uploads
- POST /api/assets/sign (Auth: Bearer)
  - Body: { filename, contentType }
  - Response: { uploadUrl, assetUrl, fields? } (signed URL for S3/GCS)

- GET /api/assets/:id/thumb?size= (public)
  - Response: redirect or image stream

Notes: Validate file size/type, generate thumbnails server-side, store metadata in DB (id, url, width, height, size).

---

### Contact form
- POST /api/contact
  - Body: { name, email, message }
  - Response: 200 { ok: true }
  - Server: send email notification + store in DB
  - Zod: basic validation + recaptcha optional

---

### Localization / i18n helper
- GET /api/locales/:lang
  - Response: translation JSON (optional; front uses static locale files but backend can provide dynamic replacements)

---

## DB models recommandés (résumé)
- Projects table (id, title jsonb, description jsonb, category, status, image_url, github_url, demo_url, technologies jsonb, members jsonb, created_at)
- Education table (id, institution jsonb, degree jsonb, start_year, end_year, description jsonb)
- Experience table (id, title jsonb, company, description jsonb, start_date, end_date, technologies jsonb)
- Skills table (id, name, category, level)
- Assets table (id, url, mime, width, height, size, uploaded_by, created_at)

Indexation: text search indexes on JSON fields as needed (GIN on jsonb, functional index on ->> 'en' or 'fr').

---

## Contrats API rapides (exemples)

- Create Project (POST /api/admin/projects)
Request JSON (abrégé):
```json
{
  "title": {"fr":"Titre FR","en":"Title EN"},
  "description": {"fr":"...","en":"..."},
  "category": "Computer Vision",
  "technologies": [{"id":"t1","name":"Python"}],
  "imageUrl": "https://...",
  "github_url": "https://..."
}
```

Response 201: created resource with id.

---

## Tests & CI
- Unit tests: controllers, validation, cache logic. Mock upstream LLM responses.
- Integration tests: end-to-end flows (admin create + public read + translate proxy mock).
- CI: run tests + lint + typecheck. Gate merges on green build.

---

## Monitoring & alerting
- Alert on elevated `translate_errors_total` or high latency percentiles (> P95 > 2s for high-quality models).
- Alert on cost anomalies (tokens/month spike).

---

Si tu veux, je peux :
- Implémenter un prototype Express `/server` avec ces routes minimales dans le repo (routes + tests mocked), ou
- Générer des Postman/Insomnia collection + OpenAPI spec à fournir aux backend engineers.

Dis-moi quelle sortie tu préfères et je la produis (prototype Express ou OpenAPI + collection). 
