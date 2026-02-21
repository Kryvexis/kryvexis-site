# Kryvexis Next-Level Website v12
Added:
- Apple-like flow: subtle scroll-snap on desktop + right-side section dots + top progress bar
- New sections: Stats counters, UI Showcase (tabs), Workflow timeline, Testimonials, Install-as-app, Founder story
- WhatsApp floating button + contact details baked in

## Run
1) Install deps

```bash
npm install
```

2) Create your env file

```bash
cp .env.local.example .env.local
```

Then set `LEAD_WEBHOOK_URL` (used by `POST /api/lead`).

3) Start dev server

```bash
npm run dev
```

Open: http://localhost:3000

## Demo video later
Replace youtubeId in `src/app/page.jsx` when you have a demo.

## Deploy (Vercel)
- Push to GitHub
- Import into Vercel
- Add env vars:
  - `LEAD_WEBHOOK_URL`
  - `NEXT_PUBLIC_SITE_URL` (optional but recommended)


## v13 polish
- Section edge fade overlays
- Scroll-driven background drift
- Micro parallax on headings/cards
