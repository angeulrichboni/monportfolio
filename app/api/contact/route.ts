import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email: string;
  message: string;
  website?: string; // honeypot
  _ts?: string; // timestamp
};

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function escapeHTML(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail({ name, email, message, ip }: { name?: string; email: string; message: string; ip?: string }) {
  const safeName = name ? escapeHTML(name) : "(non renseigné)";
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message);
  const now = new Date();
  const when = now.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });

  const brandBlue = "#0369a1"; // sky-700
  const accentOrange = "#f97316"; // orange-500
  const textPrimary = "#0f172a"; // slate-900
  const textSecondary = "#475569"; // slate-600
  const bg = "#f8fafc"; // slate-50
  const card = "#ffffff";

  const html = `
  <!doctype html>
  <html lang="fr">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <title>Nouveau message de contact</title>
  </head>
  <body style="margin:0;padding:24px;background:${bg};font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:${textPrimary};">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="640" border="0" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:${card};border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 2px rgba(16,24,40,0.06),0 1px 1px rgba(16,24,40,0.04);">
            <tr>
              <td style="padding:16px 20px;background:${brandBlue};color:#fff;">
                <div style="font-weight:800;letter-spacing:0.2px">MonPortfolio</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 20px 8px 20px;">
                <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${accentOrange};color:#fff;font-size:12px;font-weight:700;">Nouveau message</span>
                <h1 style="margin:12px 0 6px 0;font-size:20px;line-height:1.3;">Un visiteur a envoyé un message</h1>
                <p style="margin:0;color:${textSecondary};font-size:14px;">Reçu le ${when}${ip ? ` · IP ${escapeHTML(ip)}` : ""}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px 4px 20px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background:${bg};border:1px solid #e5e7eb;border-radius:10px;">
                  <tr>
                    <td style="padding:12px 16px;font-size:14px;">
                      <div style="margin:4px 0;"><strong style="color:${textPrimary};">Nom:</strong> <span style="color:${textSecondary};">${safeName}</span></div>
                      <div style="margin:4px 0;"><strong style="color:${textPrimary};">Email:</strong> <a href="mailto:${safeEmail}" style="color:${brandBlue};text-decoration:none;">${safeEmail}</a></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px 20px 20px;">
                <div style="border:1px solid #e5e7eb;border-radius:10px;background:#fafafa;padding:14px;">
                  <div style="font-weight:700;margin-bottom:8px;">Message</div>
                  <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:${textPrimary};">${safeMessage}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px 20px 20px;color:${textSecondary};font-size:12px;border-top:1px solid #e5e7eb;">
                Vous pouvez répondre directement à cet e‑mail pour répondre à l’expéditeur.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

  const text = `Nouveau message de contact\n\nNom: ${name ?? "(non renseigné)"}\nEmail: ${email}\nReçu: ${when}${ip ? `\nIP: ${ip}` : ""}\n\nMessage:\n${message}`;

  return { html, text };
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;
  if (!body || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
  }

  const { name, email, message, website, _ts } = body;
  // Honeypot: if filled, reject silently
  if (website && String(website).trim().length > 0) {
    return NextResponse.json({ ok: true });
  }
  // Minimal fill time: at least 2s between render and submit
  const now = Date.now();
  const ts = _ts ? Number(_ts) : 0;
  if (!Number.isNaN(ts) && ts > 0 && now - ts < 2000) {
    return NextResponse.json({ ok: false, error: "Soumission trop rapide." }, { status: 429 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Message trop long." }, { status: 400 });
  }

  // Simple in-memory rate limit (per server instance)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `contact:${ip}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = global as any;
  if (!globalAny.__contactRate) globalAny.__contactRate = new Map<string, { count: number; reset: number }>();
  const bucket = globalAny.__contactRate.get(key);
  const windowMs = 60 * 1000; // 1 minute
  const limit = 5; // 5 req/min par IP
  const nowMs = Date.now();
  if (!bucket || nowMs > bucket.reset) {
    globalAny.__contactRate.set(key, { count: 1, reset: nowMs + windowMs });
  } else {
    bucket.count += 1;
    if (bucket.count > limit) {
      return NextResponse.json({ ok: false, error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
    }
    globalAny.__contactRate.set(key, bucket);
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO = process.env.CONTACT_TO; // Ton email destination
  const MAIL_FROM = process.env.MAIL_FROM || "onboarding@resend.dev"; // Doit être un domaine vérifié en prod

  if (!RESEND_API_KEY || !CONTACT_TO) {
    console.warn("Contact API non configurée: variables RESEND_API_KEY et/ou CONTACT_TO manquantes.");
    return NextResponse.json({ ok: false, error: "Service email non configuré." }, { status: 500 });
  }

  const subject = `Nouveau message de contact${name ? ` — ${name}` : ""}`;
  const { html, text } = buildEmail({ name, email, message, ip: ip !== "unknown" ? ip : undefined });

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [CONTACT_TO],
        subject,
        html,
        text,
        reply_to: [email],
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error("Resend error:", err);
      return NextResponse.json({ ok: false, error: "Échec d'envoi de l'email." }, { status: 502 });
    }
  } catch (e) {
    console.error("Email send failed:", e);
    return NextResponse.json({ ok: false, error: "Erreur d'envoi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
