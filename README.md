# 🌌 Pranav L.P. — Space-Themed Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-blue?style=flat-square)](https://github.com/darkroomengineering/lenis)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

An interactive, high-performance, single-page developer portfolio featuring custom GLSL hyperspace shaders, interactive 3D particle galaxies, fluid physics-based typography, glassmorphism UI, a comprehensive hackathon log, PDF resume viewer, and a zero-backend contact form powered by Web3Forms.

---

## ✨ Features & Highlights

- **🚀 Hyperspace Warp Intro:** Cinematic 3D entrance animation utilizing procedural WebGL starfield acceleration.
- **🪐 Interactive Particle Galaxy:** Custom Three.js shaders reacting to cursor velocity and scroll depth.
- **💎 Glassmorphic Interface:** Clean, modern HUD-inspired cards with depth perspective tilt and micro-interactions.
- **🏆 Hackathon Log & Achievements:** Interactive modal detailing national-level hackathons, podium finishes, and project breakdowns.
- **📄 Resume Integration:** In-browser modal viewer with quick-download fallback for the bundled resume.
- **✉️ Working Contact Form:** Fully functional client-side form integration via Web3Forms delivering messages directly to your inbox with anti-spam honeypot and mailto fallback.
- **⚡ Ultra-Fast Performance:** Zero heavy frameworks; built with pure vanilla JS, optimized CSS tokens, and Vite.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Build & Bundler** | [Vite 6](https://vitejs.dev/) |
| **3D & Shaders** | [Three.js](https://threejs.org/) (custom GLSL vertex & fragment shaders) |
| **Motion & Scroll** | [GSAP](https://greensock.com/gsap/) & [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis) |
| **Styling** | Vanilla CSS (CSS variables, backdrop-filter glassmorphism, responsive grid) |
| **Form Backend** | [Web3Forms](https://web3forms.com/) (Serverless form handling) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pranav-lp/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your free Web3Forms access key (generated in 5 seconds at [web3forms.com](https://web3forms.com)):
   ```env
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Builds optimized production bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run check` | Runs production build + 13 automated smoke tests |
| `npm run build:single` | Builds everything into a single self-contained HTML file |

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) &rarr; **Add New Project** &rarr; **Import** `pranav-lp/portfolio`.
3. In the **Environment Variables** section, add:
   - `VITE_WEB3FORMS_KEY`: *(Your Web3Forms access key)*
   - `SITE_URL`: *(Your production domain, e.g. `https://pranav-portfolio.vercel.app`)*
4. Click **Deploy**. Vercel will automatically run `npm run build` and serve from `dist/`.

> **Note on Security:** All private credentials and access keys are managed via environment variables (`.env`). The `.env` file is excluded from Git tracking via `.gitignore`, ensuring your private keys remain completely protected.

---

## 📁 Project Structure

```text
├── docs/                # Architecture, deployment checklists, and review documentation
├── public/              # Static assets (robots.txt, headers, og image)
├── src/
│   ├── assets/          # Avatar, resume PDF, and background textures
│   ├── hero.js          # WebGL starfield and hyperspace warp canvas
│   ├── main.js          # Three.js galaxy, GSAP interactions, form handling
│   └── style.css        # Global glassmorphic styling, CSS variables & typography
├── tools/               # Resume generator and automated smoke test scripts
├── .env.example         # Template for environment variables
├── .gitignore           # Git ignore rules for node_modules, dist, and secrets
├── index.html           # Semantic HTML structure and content
├── package.json         # Scripts and project dependencies
├── vercel.json          # Security headers and Vercel routing configuration
└── vite.config.js       # Vite configuration and singlefile bundling
```

---

## 📬 Contact & Connect

- **Name:** Pranav L.P.
- **GitHub:** [@pranav-lp](https://github.com/pranav-lp)
- **LinkedIn:** [linkedin.com/in/pranavlp](https://www.linkedin.com/in/pranavlp/)
- **Email:** [pranavworks.lp@gmail.com](mailto:pranavworks.lp@gmail.com)

---

⭐ *If you like this project, feel free to give it a star!*
