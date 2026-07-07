# HackHub \u2014 Next.js + Prisma (SQLite) + NextAuth

A modern platform for hosting and joining hackathons. Built with:

- **Next.js 14** (App Router)
- **Tailwind CSS** for utility-first styling
- **Prisma + SQLite** for the database
- **NextAuth v5** for Google, GitHub, and credentials login

## Quick start

```bash
# 1. Install deps
npm install

# 2. Copy env file
cp .env.example .env
# Then set AUTH_SECRET, and (optionally) AUTH_GOOGLE_ID/SECRET and AUTH_GITHUB_ID/SECRET

# 3. Push schema + seed sample hackathons
npm run db:push
npm run db:seed

# 4. Run dev server
npm run dev
```

App will be available at http://localhost:3000

## Seeded accounts

| Role       | Email                | Password   |
|------------|----------------------|------------|
| Admin      | admin@hackhub.dev    | admin123   |
| Contestant | you@hackhub.dev      | password   |

## OAuth setup

### Google
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client (Web application)
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Put ID/secret in `.env`

### GitHub
1. Go to https://github.com/settings/developers \u2192 New OAuth App
2. Homepage: `http://localhost:3000`
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Put ID/secret in `.env`

## Concepts covered

- **Routing**: file-based, dynamic (`[id]`), nested, route groups (`(marketing)`), parallel/interception ready structure.
- **SSR/SSG/ISR**: hackathons listing uses ISR (`revalidate = 60`), detail pages use SSG w/ `generateStaticParams`.
- **Server Components** by default; **Client Components** only where needed (`'use client'`).
- **Server Actions** for registration flows.
- **NextAuth** with Google, GitHub, Credentials.
- **Middleware** protects `/admin/*` and `/dashboard` routes.
- **next/image** for optimized images.
- **Metadata API** for SEO.
- Context (theme) + `useState`/`useEffect` on client side.
- Tailwind CSS + CSS modules co-exist for reusable components.

## Project structure

```
app/
  layout.js              # Root layout
  page.js                # Home (SSG)
  globals.css            # Tailwind + tokens
  (marketing)/           # Route group for public pages
    about/page.js
    support/page.js
  explore/page.js        # ISR listing
  hackathon/[slug]/page.js
  login/[[...role]]/page.js
  dashboard/page.js      # Protected contestant dashboard
  admin/dashboard/page.js
  api/auth/[...nextauth]/route.js
prisma/
  schema.prisma
  seed.mjs
lib/
  auth.js                # NextAuth config
  prisma.js              # Prisma client singleton
  actions.js             # Server actions
components/
  Header.jsx, Footer.jsx, Hero.jsx ...
middleware.js            # Protect routes
```
