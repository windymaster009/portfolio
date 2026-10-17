# Kevin Nhim / Windy — Developer Portfolio

This is Kevin Nhim's developer portfolio, based on the design, animations, components, and layout of [DeveloperFolio](https://github.com/windymaster009/DeveloperFolio), now with a refreshed **2026 CV**, new professional and personal projects, updated text, and the original illustrated React experience.

The previous lightweight static website was replaced because the DeveloperFolio presentation works better for this portfolio. It remains accessible in the Git history before the migration.

## What you'll see

- DeveloperFolio light-mode layout, Lottie illustrations, cards and reveal animations.
- GitHub public-repository statistics and featured projects, generated at build/start time.
- Updated project cards: payment platform engineering, VaultHub, Telegram E-Shop, WindyCast, Telegram Drive, Solar Home, Android Scanner and automation.
- Existing three schools, work history and technical skills.
- **Updated CV** at `public/Kevin_Nhim_CV_2026.pdf`, automatically served as `/portfolio/Kevin_Nhim_CV_2026.pdf` on GitHub Pages.
- Printable CV web page at `/portfolio/cv.html` on GitHub Pages.
- Personal project links only when public; internal work and private repository links stay private.

## Host ONLY this portfolio on GitHub Pages

Deployment workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

1. Open [portfolio → Settings → Pages](https://github.com/windymaster009/portfolio/settings/pages).
2. In **Build and deployment**, choose **GitHub Actions** under **Source**.
3. If GitHub requires a public repository because the account uses GitHub Free, go to **Settings → General → Danger Zone → Change repository visibility** and make this repository public **only if you are comfortable showing its code**. GitHub Pro and higher support Pages on private repositories. Do not change any other repository.
4. Open [Actions → Deploy Portfolio to GitHub Pages](https://github.com/windymaster009/portfolio/actions/workflows/deploy-pages.yml) and run the workflow with **Run workflow** if the initial push happened before Pages was enabled.
5. After it succeeds, visit **https://windymaster009.github.io/portfolio/**. The CV is at **https://windymaster009.github.io/portfolio/cv.html**.

Once configured, every push to `main` automatically builds and deploys. No Raspberry Pi, PC server, domain purchase, or other project deployment is needed.

The workflow's `build` job also runs on pull requests to catch broken asset links before merging. The website's public GitHub summary is refreshed from the GitHub API at build time.

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
