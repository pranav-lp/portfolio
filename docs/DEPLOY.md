# Deploy checklist & runbook

## Pre-deploy
- [x] `npm run check` passes (build + 13 smoke tests)
- [x] `npm audit` reports 0 vulnerabilities
- [x] Code and accessibility reviewed (docs/QUALITY.md)
- [ ] Open the preview on a phone and a laptop; scroll the whole page
- [ ] Set `SITE_URL` env var on the host

## Deploy (Vercel)
1. Push to GitHub. 2. vercel.com → Add New → Project → import the repo (Vite is auto-detected; build `npm run build`, output `dist`). 3. Add env var `SITE_URL=https://<your-domain>`. 4. Deploy.
Netlify: same, publish dir `dist`. GitHub Pages: publish `dist/` (paths are relative).

## Smoke test on the live URL
- [ ] Hero intro plays; page scrolls smoothly
- [ ] Resume: View opens (new tab on phones), Download saves the PDF
- [ ] LinkedIn and GitHub buttons open the right profiles
- [ ] Hackathon list pop-up opens, closes with Esc, focus returns to the button
- [ ] Set `VITE_WEB3FORMS_KEY` in `.env` (or host environment variables) and verify contact form test message arrives in `pranavworks.lp@gmail.com`
- [ ] Share the link in a chat to check the preview image

## Rollback
Vercel → Deployments → previous deployment → Promote to Production (one click). Roll back if: blank page, JS errors in console, or the form fails and the mailto fallback also fails.

## Post-deploy
Note the date and URL in the README; submit the URL to Google Search Console.
