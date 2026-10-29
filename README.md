# traverse-landing

## Editing homepage content with TinaCMS

Homepage copy, services, plan details, journey steps, feature cards, testimonials, and FAQs are managed in `content/pages/home.json` and can be edited from Tina's admin interface.

1. Install dependencies with `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:3000/admin/index.html` to edit the local content file.

Local editing works without TinaCloud credentials. To enable hosted editing that saves changes to GitHub, create/connect a TinaCloud project and set `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` in `.env.local` and in the Vercel project environment. Set `NEXT_PUBLIC_TINA_BRANCH=main` for production. Copy `.env.example` as a template; never commit `.env.local`.

When both TinaCloud values are present, the production build generates Tina's hosted admin app before building Next.js. Without them, the public site still builds and uses the checked-in homepage content; the hosted editor is omitted. Configure TinaCloud credentials in Vercel before deploying to enable `/admin/index.html` and Git-backed saves.
