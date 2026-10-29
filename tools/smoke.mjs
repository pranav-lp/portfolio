// Post-build smoke test: node tools/smoke.mjs  (run `npm run build` first)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const assets = existsSync('dist/assets') ? readdirSync('dist/assets') : [];
const js = assets.filter(f => f.endsWith('.js')).map(f => readFileSync('dist/assets/' + f, 'utf8')).join('\n');
const checks = [
  ['html lang="en"', /<html lang="en"/.test(html)],
  ['exactly one <h1>', (html.match(/<h1[ >]/g) || []).length === 1],
  ['GitHub link', html.includes('href="https://github.com/pranav-lp"')],
  ['LinkedIn link', html.includes('linkedin.com/in/pranavlp')],
  ['email present', html.includes('pranavworks.lp@gmail.com')],
  ['skip link', html.includes('class="skip"')],
  ['canvases hidden from screen readers', (html.match(/<canvas[^>]*aria-hidden="true"/g) || []).length === 3],
  ['form status is aria-live', html.includes('id="fb" aria-live="polite"')],
  ['og + twitter tags', html.includes('og:image') && html.includes('twitter:card')],
  ['resume PDF bundled', assets.some(f => f.endsWith('.pdf'))],
  ['form endpoint wired', js.includes('web3forms.com') || js.includes('formsubmit.co')],
  ['removed names absent', !/hospital os|suraksha|senior shield|gigspace|import paradox|powerhouse|45\/50/i.test(html + js)],
  ['no leftover SITE_URL placeholder in links', !html.includes('%SITE_URL%')],
];
let bad = 0;
for (const [n, ok] of checks) { console.log((ok ? 'PASS ' : 'FAIL ') + n); if (!ok) bad++; }
process.exit(bad ? 1 : 0);
