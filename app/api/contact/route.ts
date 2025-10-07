import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  // TODO: Integrate with email service (Resend, Mailgun, etc.)
  console.log("Contact message:", body);
  return NextResponse.json({ ok: true });
}
