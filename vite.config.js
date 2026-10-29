import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// SITE_URL (e.g. https://pranav.dev) fills canonical + og:image and emits sitemap.xml
const site = (process.env.SITE_URL || '').replace(/\/$/, '');
const siteUrl = () => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replace(/%SITE_URL%/g, site),
  generateBundle() {
    if (site) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}/</loc></url></urlset>\n` });
  },
});

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [siteUrl(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single'
    ? { outDir: 'dist-single', assetsInlineLimit: 100000000 }
    : { assetsInlineLimit: (f) => (f.endsWith('.pdf') ? false : undefined) }, // keep the resume as a real file
}));
