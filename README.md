# Kevin Nhim / Windy — Developer Portfolio

This is Kevin Nhim's developer portfolio, based on the design, animations, components, and layout of [DeveloperFolio](https://github.com/windymaster009/DeveloperFolio), now with a refreshed **2026 CV**, new professional and personal projects, updated text, and the original illustrated React experience.

The previous lightweight static website was replaced because the DeveloperFolio presentation works better for this portfolio. It remains accessible in the Git history before the migration.

## What you'll see

- DeveloperFolio light-mode layout, Lottie illustrations, cards and reveal animations.
- GitHub public-repository statistics and featured projects, generated at build/start time.
- Updated project cards: payment platform engineering, VaultHub, Telegram E-Shop, WindyCast, Telegram Drive, Solar Home, Android Scanner and automation.
- Existing three schools, work history and technical skills.
- **Updated CV** in `public/Kevin_Nhim_CV_2026.pdf`, accessible at `/Kevin_Nhim_CV_2026.pdf`.
- Printable CV web page at `/cv.html`.
- Personal project links only when public; internal work and private repository links stay private.

## Run locally on Windows

Install [Node.js LTS](https://nodejs.org/) if necessary. From Command Prompt:

```cmd
cd /d E:\portfolio
git pull --ff-only origin main
npm install --legacy-peer-deps
npm start
```

Visit **http://localhost:3000**. React's development server runs on 3000 by default; if port 3000 is already occupied, npm may ask to use another.

**Important:** This is a React app, not the previous no-build static site. Don't use `python -m http.server 3031` from the repository root anymore.

## Production build

```bash
npm install --legacy-peer-deps
npm run build
npx serve -s build -l 3031
```

Visit **http://localhost:3031**. The static build can be deployed to any static host. The original `scripts/deploy-pi.sh` and PM2 configuration also remain available for later, but you do not need a Raspberry Pi to test locally.

## Customize

- `src/portfolio.js`: greeting, CV URL, work experience, education, skills, project cards and links.
- `src/containers`: React sections and animations.
- `src/assets`: images, Lottie assets and logos.
- `src/_globalColor.scss`: color palette.
- `fetch.js`: build-time GitHub stats, not credentials shipped to the browser.

Before sending CV applications, confirm the end/start dates for CISA and the current payment-platform role. Don't add confidential client data or private repository source.

## Attribution and license

The design and source are based on the original **saadpasta/developerFolio**, as modified in [windymaster009/DeveloperFolio](https://github.com/windymaster009/DeveloperFolio). Its existing **GPL-3.0** license and applicable asset attributions are retained here in `LICENSE`. Additional project data and original logos were prepared for Kevin Nhim.
