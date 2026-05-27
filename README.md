# Vaidy

> Your AI Health Copilot, Built for India.

Vaidy reads blood reports from Apollo, Thyrocare, Lal Path Labs, Dr. Lal and 50+ other labs, detects trends across your biomarkers, and explains everything in plain Hindi or English — no jargon, no chatbot guesswork.

🌐 Live: [vaidy.vercel.app](https://vaidy.vercel.app)

---

## What Vaidy does

- **Reads any format** — PDFs, images, prescriptions, blood tests, MRIs, echoes
- **Health memory** — builds a searchable record of your reports across time
- **Plain language** — explanations a 12-year-old can follow, in English or Hindi
- **Trend detection** — spots patterns across months and years (HbA1c, TSH, Vitamin D, lipids, and more)
- **Ask anything** — chat naturally with your entire health history
- **India-first** — built for Indian lab formats, reference ranges, diets, and context

## Repository layout

```
Vaidy/
└── frontend/        Next.js 14 landing site + waitlist (this repo's only app today)
```

The backend (report parsing, biomarker extraction, conversational layer) is tracked in a separate repo and is not yet open.

## Frontend

The marketing site is a Next.js 14 App Router project styled with Tailwind CSS and animated with Framer Motion.

### Tech stack

- [Next.js 14](https://nextjs.org) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Deployed on Vercel

### Pages

- `/` — landing page (hero, features, demo, timeline, waitlist)
- `/contact`
- `/privacy`
- `/terms`

### Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edits to `app/page.tsx` and components in `components/` hot-reload automatically.

### Scripts

| Command         | What it does                  |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the dev server          |
| `npm run build` | Production build              |
| `npm run start` | Run the production build      |
| `npm run lint`  | Lint with `eslint-config-next`|

## Roadmap

- Report upload + biomarker extraction pipeline
- Multilingual explanations (Hindi-first, then regional)
- Longitudinal trend dashboard
- Doctor-share view (one-link summaries)

## Contributing

The codebase is small and friendly. Open an issue or PR if you spot a bug, a typo, or have an idea. For feature work, please start a discussion first so we can align on scope.

## License

TBD — until then, all rights reserved by the Vaidy team.
