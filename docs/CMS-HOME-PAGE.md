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

For production, use Postgres and run `npm run build` (migrations run automatically).
