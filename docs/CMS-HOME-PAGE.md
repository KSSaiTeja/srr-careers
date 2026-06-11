# Home page content (Payload CMS)

## Log in

1. Start the site: `npm run dev`
2. Open **http://localhost:3000/admin**
3. Create your admin account on first visit (email + password).

## Edit the homepage

1. In the left sidebar, open **Globals → Home Page**.
2. Use the **numbered tabs** (same order as the live page):
   - **1 · Hero** — headline, buttons, hero image
   - **2 · Problem** — “Does this relate…” section
   - **3 · Mission** — stats cards and alumni block
   - **4 · Instructor** — bio and side feature bullets
   - **5 · Curriculum** — module list and syllabus button
   - **6 · Testimonials** — student quotes
   - **7 · Book a demo** — bottom blue section text
3. Click **Save** (top right). The site refreshes within about a minute.

## Images

1. Go to **Collections → Media** and upload a file (add a short description in “Image description”).
2. On **Home Page**, pick that image in **Hero photo** or **Instructor photo**.

## Environment

Copy `.env.example` to `.env.local` and set:

- `PAYLOAD_SECRET` — long random string (keep private)
- `DATABASE_URL` — default `file:./payload.db` for local SQLite

## Deploying admin to Vercel

Vercel cannot use `file:./payload.db`. Serverless functions have no persistent local disk, so `/admin` will fail if you copy the local database URL to Vercel.

Use **Turso** (free tier) for a remote SQLite database:

1. Install the Turso CLI and create a database: `turso db create srr-careers`
2. Get the URL: `turso db show srr-careers --url`
3. Create a token: `turso db tokens create srr-careers`
4. In **Vercel → Project → Settings → Environment Variables**, set for Production (and Preview if needed):
   - `PAYLOAD_SECRET` — same long random string as local (or a new one for production)
   - `DATABASE_URL` — `libsql://...` from Turso (not `file:./payload.db`)
   - `DATABASE_AUTH_TOKEN` — token from step 3
   - `NEXT_PUBLIC_SERVER_URL` — `https://your-domain.vercel.app` (optional but recommended)
5. Point local `.env.local` at the same Turso values, then run `npm run dev` once to create tables and your admin user.
6. Redeploy on Vercel.

Migrations run automatically during `npm run build` on Vercel.
