# Frontend Runbook — my-portfolio

Version: 1.0
Date: 2025-12-21
Langue: Français

## Objectif
Ce document explique le fonctionnement actuel du front-end pour un développeur qui doit maintenir, étendre ou déployer l'application. Il couvre l'architecture, les patterns de localisation, composants admin, services, commandes de build/développement, bonnes pratiques et points d'attention.

---

## Sommaire rapide
- Architecture: Vite + React + TypeScript.
- Localisation: `LocalizedString` ({ fr, en }) partout pour champs textuels.
- Public: utilise `useLocalizedData()` + `tData()` pour afficher la langue adéquate.
- Admin: utilise `TranslatableInput` pour éditer FR/EN (avec bouton "AI Translate").
- Traduction: client appelle aujourd'hui `src/services/groq.ts` mais **il faut** utiliser un proxy serveur (`/api/translate`) (voir `docs/backend-integration.md`).

---

## Structure importante (où regarder)
- Composants globaux / layout: [src/layout/Layout.tsx](src/layout/Layout.tsx)
- Entrée: [src/main.tsx](src/main.tsx)
- Types partagés: [src/types.ts](src/types.ts)
- Hook i18n/localized data: [src/hooks/useLocalizedData.ts](src/hooks/useLocalizedData.ts)
- Admin TranslatableInput: [src/admin/components/ui/TranslatableInput.tsx](src/admin/components/ui/TranslatableInput.tsx)
- Services LLM/client: [src/services/groq.ts](src/services/groq.ts)
- Admin pages: [src/admin/pages](src/admin/pages)
- Features publiques: [src/features](src/features)

---

## Modèle de données central
Le front attend et manipule les textes localisés sous la forme:

```ts
export interface LocalizedString { fr: string; en: string }
```

Domaines clés (extraits de `src/types.ts`): `Education`, `Experience`, `Project` utilisent `LocalizedString` pour `title`, `description`, etc.

Stockage côté backend attendu: JSON / `jsonb` (voir `docs/backend-integration.md`).

---

## Patterns d'affichage
- Public (site visible): utilisation de `useLocalizedData().tData()` pour obtenir une version localisée des données renvoyées par le backend ou le store. Les composants publics doivent privilégier ce pattern.
- Admin (édition): les listes administratives affichent généralement la version `.en` (anglaise) pour lecture rapide — ex.: `item.title.en` — tandis que les formulaires d'édition utilisent `TranslatableInput`.

Règles pratiques:
- Ne pas rendre un objet `LocalizedString` directement dans JSX (p.ex. `{edu.description}`) — rendre `{edu.description.en}` ou le résultat de `tData()`.
- Pour les titres courts, prévoir un fallback: `value.en || value.fr || ''`.

---

## `TranslatableInput` (comportement attendu)
- Emplacement: `src/admin/components/ui/TranslatableInput.tsx`.
- Fonction: UI à deux onglets (FR / EN), permet saisie sur chaque langue et propose "AI Translate".
- Flow "AI Translate":
  1. Lit `value[lang]` (texte source).
  2. Appelle `POST /api/translate` (ou `src/services/groq.ts` en dev) avec `sourceLang=lang`, `targetLang` inverse.
  3. Met à jour `value[targetLang]` si succès; affiche loading et erreurs via le contexte Toast.
  4. Ne persiste pas — l'utilisateur doit cliquer `Save` pour envoyer au backend admin.

Conseils:
- Garder validations Zod dans le hook `useForm` côté admin.
- Loguer la requête/response brute sur erreurs pour debug.

---

## Formulaires & Validation
- Hook centralisé: `src/admin/hooks/useForm.ts` (wrapper pour zod + react-hook-form ou équivalent).
- Schémas Zod: partager les schémas avec backend quand possible (ex.: `localizedStringSchema`).
- Lors de l'ajout d'un nouveau champ `LocalizedString` :
  - Mettre à jour `src/types.ts`.
  - Ajouter l'input dans la forme admin en utilisant `TranslatableInput`.
  - Mettre à jour les schémas Zod côté front et noter l'équivalent backend (cf `docs/backend-integration.md`).

---

## Services & API calls
- Client LLM: `src/services/groq.ts` (exemples d'appels directs vers fournisseur). **Ne pas** laisser les clés côté client en production.
- Recommandation: remplacer les appels par un proxy serveur `/api/translate` (voir `docs/backend-integration.md`).
- Autres endpoints attendus (admin + public) listés dans `docs/backend-integration.md` (CRUD projects, education, experience, assets, contact).

---

## Variables d'environnement
- Variables Vite visibles côté client doivent avoir le préfixe `VITE_` (ex: `VITE_API_BASE_URL`).
- Clés sensibles (GROQ_API_KEY, JWT secrets) doivent rester serveur-side.
- Fichiers .env : `/.env.local` pour dev, ne pas committer `.env` réels — fournir `.env.example`.

---

## Commandes utiles
- Installation (npm):

```bash
npm install
```

- Développement (hot reload):

```bash
npm run dev
# ou
pnpm dev
```

- Type-check + build (prod):

```bash
npm run build
# internals: tsc -b && vite build
```

- Lint / format (si existants):

```bash
npm run lint
npm run format
```

- Tests (front):

```bash
npm test
# ou jest / vitest selon config
```

---

## Déploiement
- Les fichiers statiques produit par `vite build` sont dans `dist` et peuvent être déployés vers Vercel, Netlify ou tout host static.
- Pour l'admin qui appelle `/api/*`, déployer un backend séparé (Express, serverless) et configurer `VITE_API_BASE_URL` pour pointer vers l'API.
- Recommandation Vercel: config vars via Dashboard, `VITE_` pour le front, secrets pour le backend.

---

## Ajouter un nouveau contenu localisé (pas-à-pas)
1. Ajouter la propriété typée `LocalizedString` dans `src/types.ts`.
2. Mettre à jour le schéma Zod front (et prévenir les backend engineers). Voir `docs/backend-integration.md`.
3. Dans l'admin, ajouter le champ avec `TranslatableInput` et gérer la valeur dans le formulaire `useForm`.
4. Dans les listes publiques, afficher via `useLocalizedData().tData()` ou rendre `value.en` comme fallback.
5. Tester le flow: créer en admin → sauvegarder → vérifier la lecture publique.

---

## Debugging & Points d'attention
- Erreur TypeScript fréquente: tenter de rendre un `LocalizedString` directement dans JSX. Solution: rendre `.en` ou `tData()`.
- Traduction automatique: le modèle peut renvoyer la même chaîne — afficher `raw` pour debug et logger upstream.
- Performance: chunks Vite peuvent être gros; utiliser code-splitting pour pages admin lourdes.
- Sécurité: vérifier que la clé LLM n'est pas exposée côté client (rechercher `dangerouslyAllowBrowser` et remplacer par proxy).

---

## Tests recommandés côté front
- Unit tests: `TranslatableInput` comportement (tabs, translate click, update targetLang). Mocker fetch vers `/api/translate`.
- Integration: flow admin create → save → public GET returns localized fields.
- CI: exiger `npm run build`, `npm test`, `npm run lint` sur PRs.

---

## Observabilité côté front
- Activer toasts pour erreurs user-facing (traduction failed, save failed).
- Ajouter console.warn/info sur responses inattendues durant développement.

---

## Références
- Backend spec détaillé: [docs/backend-integration.md](docs/backend-integration.md)
- Translatable input: [src/admin/components/ui/TranslatableInput.tsx](src/admin/components/ui/TranslatableInput.tsx)
- Types partagés: [src/types.ts](src/types.ts)
- Services LLM (client): [src/services/groq.ts](src/services/groq.ts)

---

Si tu veux, je peux aussi :
- Ajouter des exemples de tests unitaires pour `TranslatableInput` et `useForm`.
- Implémenter le proxy `/server` prototype Express dans le repo (routes + tests) pour sécuriser la traduction.
- Générer une check-list PR pour valider l'ajout de nouveaux champs localisés.

Dis-moi quelle sortie tu veux en priorité.
