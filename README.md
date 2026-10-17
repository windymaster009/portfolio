# Kevin Nhim / Windy — Portfolio (2026)

A new, responsive developer portfolio and CV for **Kevin Nhim**, built using content from the older [DeveloperFolio](https://github.com/windymaster009/DeveloperFolio), the earlier personal site, and recent projects.

## Highlights

- Responsive light-mode editorial design, custom CSS project illustrations, and subtle reveal animations.
- Professional vs personal vs public/open-source project filters.
- Payment platform, VaultHub, Telegram E-Shop, WindyCast, Telegram Drive, Solar Home/Pi Lab, and Phone Admin Dashboard case studies.
- Experience timeline, skills, three schools, and contact links.
- Printable CV at [cv.html](./cv.html) plus downloadable [PDF](./Kevin_Nhim_CV_2026.pdf).
- Zero JavaScript framework dependencies; no npm install or compilation required.
- Keyboard-friendly navigation, reduced-motion support, semantic content, responsive layouts.

## Preview locally

```bash
git clone git@github.com:windymaster009/portfolio.git
cd portfolio
python3 -m http.server 3031
```

Open `http://localhost:3031`. For editing, modify `index.html`, `cv.html`, and `assets/styles.css`.

## Raspberry Pi / PM2

On the Raspberry Pi, with the private repository accessible through GitHub SSH credentials:

```bash
git clone git@github.com:windymaster009/portfolio.git
cd portfolio
pm2 serve . 3031 --name windy-portfolio
pm2 save
```

Choose port **3031** to avoid conflicting with an existing site on 3030. If using Cloudflare Tunnel, map the new hostname to `http://localhost:3031`. After subsequent updates:

```bash
cd ~/portfolio
git pull --ff-only origin main
pm2 restart windy-portfolio
```

No build or dependency installation is necessary.

## Before public launch

- Confirm dates of employment: the older site listed CISA from **Nov 2022**, and the current payment-platform job did not specify a start date.
- Confirm which professional project details are safe to publish. No private repository links or proprietary source code are shared here.
- Review CV wording, contact details, and project claims before applying.
- The current GitHub repository is private. To launch a public site, deploy it with your chosen host or explicitly change the repository visibility.

## Attribution

This site is **new code** and is not a copy of the old DeveloperFolio theme. It carries over factual biography and portfolio content, not the GPL-licensed layout/assets. The older DeveloperFolio repository remains unchanged.
