import { NextResponse } from "next/server";

export async function POST(req) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "Missing LEAD_WEBHOOK_URL" }, { status: 500 });
  }

  let body = {};
  try { body = await req.json(); } catch { body = {}; }

  // server-side tracking (Vercel)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  // Add metadata (server-side)
  body.formTs = body.formTs ?? Date.now() - 6000;
  body.hp = body.hp ?? "";
  body.deviceKey = body.deviceKey ?? ("web-" + Math.random().toString(16).slice(2));
  body.userAgent = req.headers.get("user-agent") || body.userAgent || "";
  body.ip = body.ip || ip;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); }
    catch { data = { ok: false, error: "Non-JSON webhook response", raw: text.slice(0, 300) }; }

    return NextResponse.json(data, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
