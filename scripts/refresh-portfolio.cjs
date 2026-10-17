/**
 * Update imported DeveloperFolio source with current CV and project information.
 * Preserves the original React components, Lottie animations, styles, and layout.
 */
const fs = require("fs");
const path = require("path");
const config = path.join(__dirname, "..", "src", "portfolio.js");
let source = fs.readFileSync(config, "utf8");

function replaceSection(startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) throw new Error("DeveloperFolio markers missing: " + startMarker);
  source = source.slice(0, start) + replacement + "\n\n" + source.slice(end);
}

const greeting = [
  'const greeting = {',
  '  username: "Kevin Nhim",',
  '  title: "Hi all, I am Kevin",',
  '  subTitle: emoji("Software Developer from Cambodia. I build fintech operations tools, full-stack apps, APIs, Telegram bots, automation and self-hosted services. I enjoy making complex workflows reliable and easier to use."),',
  '  resumeLink: "/Kevin_Nhim_CV_2026.pdf",',
  '  displayGreeting: true',
  '};'
].join("\n");
replaceSection("const greeting = {", "const socialMediaLinks = {", greeting);

const projectData = [
  ["fintechLogo.svg", "Payment Platform Engineering", "Backend and web features for payment operations: payout and settlement verification, manual transfers, receipts, audit logging, transaction search, and job scheduling.", null],
  ["vaultHubLogo.svg", "VaultHub", "Bank account inventory and operational tools with permission-aware credential management, Excel import, audits, and a streamlined interface.", null],
  ["eshopLogo.svg", "Telegram E-Shop", "Digital product Telegram bot with wallet/deposit flows, KHQR payments, automated payment-message matching, inventory, and promotions.", null],
  ["windyCastLogo.svg", "WindyCast", "In-development Android-to-PC game mirroring with QR pairing, screen capture and Windows receiver workflows.", "https://github.com/windymaster009/streamlabintoandroid"],
  ["telegramDriveLogo.svg", "Telegram Drive", "A Telegram-backed file workflow app with folder views, browsing, sharing, metadata editing and search.", "https://github.com/windymaster009/Telegram-Drive"],
  ["solarHomeLogo.svg", "Solar Home / Raspberry Pi", "Self-hosted web services and operational automation running on Linux and Raspberry Pi with PM2 and secure remote access.", "https://github.com/windymaster009/solarhome"],
  ["scannerLogo.svg", "Phone Admin Dashboard", "Android-connected dashboard for barcode-scanner-style workflows, device connectivity and input tooling.", "https://github.com/windymaster009/phone-admin-dashboard"],
  ["automationLogo.svg", "Automation Projects", "Telegram/Discord utilities, scheduled messages, listener workflows and other tools for removing repetitive tasks.", "https://github.com/windymaster009"]
];
// Add well-formed project entries; avoid inventing private source URLs.
const entries = projectData.map(function (p) {
  const footer = p[3] ? [{name:"View GitHub", url:p[3]}] : [];
  return '    {image: require("./assets/images/' + p[0] + '"), projectName: ' +
    JSON.stringify(p[1]) + ', projectDesc: ' + JSON.stringify(p[2]) +
    ', footerLink: ' + JSON.stringify(footer) + '}';
});
const newProjects = [
  'const bigProjects = {',
  '  title: "Selected Projects",',
  '  subtitle: "PRODUCTS, AUTOMATION AND FULL-STACK ENGINEERING",',
  '  projects: [',
  entries.join(",\n"),
  '  ],',
  '  display: true',
  '};'
].join("\n");
replaceSection("const bigProjects = {", "const achievementSection = {", newProjects);

fs.writeFileSync(config, source);
const fetchPath = path.join(__dirname, "..", "fetch.js");
let fetchSource = fs.readFileSync(fetchPath, "utf8");
fetchSource = fetchSource.replace(
  '"telegrambot-py-eshop",\n  "Telegram-Drive",',
  '"streamlabintoandroid",\n  "Telegram-Drive",\n  "phone-admin-dashboard",'
);
fetchSource = fetchSource.replace(
  'repo.name.toLowerCase() !== "developerfolio"',
  'repo.name.toLowerCase() !== "developerfolio" &&\n      repo.name.toLowerCase() !== "portfolio"'
);
fs.writeFileSync(fetchPath, fetchSource);

const logoDir = path.join(__dirname, "..", "src", "assets", "images");
const icons = {
  "vaultHubLogo.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#184d86"/><stop offset="1" stop-color="#4ba8aa"/></linearGradient></defs><rect width="600" height="380" rx="25" fill="#edf6f8"/><rect x="110" y="62" width="380" height="260" rx="25" fill="url(#g)"/><rect x="184" y="145" width="230" height="129" rx="11" fill="#e1f7f6"/><path d="M197 145v-32c0-53 32-85 102-85s103 32 103 85v32" fill="none" stroke="#d8f7ec" stroke-width="26" transform="translate(0 32)"/><circle cx="300" cy="193" r="16" fill="#3579a9"/><path d="m288 234 9-30h6l9 30z" fill="#3579a9"/><text x="300" y="300" text-anchor="middle" font-family="Arial" font-size="22" font-weight="bold" fill="#fff">VAULTHUB</text></svg>',
  "windyCastLogo.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#4f68ed"/><stop offset="1" stop-color="#142950"/></linearGradient></defs><rect width="600" height="380" rx="25" fill="#eef1ff"/><rect x="115" y="65" width="372" height="230" rx="17" fill="#192d55"/><rect x="131" y="81" width="339" height="195" rx="6" fill="url(#g)"/><path d="M255 125v98l84-49z" fill="#a8ffe0"/><path d="M232 305h140l16 15H217z" fill="#56647d"/><rect x="401" y="151" width="76" height="143" rx="13" fill="#223858" stroke="#bfcafc" stroke-width="6"/><rect x="413" y="169" width="52" height="100" rx="3" fill="#6686ed"/><path d="m420 215 10-10 10 10 15-15" fill="none" stroke="#c6ffea" stroke-width="5"/></svg>',
  "scannerLogo.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380"><rect width="600" height="380" rx="25" fill="#edf6fe"/><rect x="150" y="62" width="300" height="256" rx="18" fill="#2a527b"/><rect x="164" y="76" width="272" height="228" rx="10" fill="#f7fcff"/><path d="M185 125h17v110h-17zm26 0h7v110h-7zm19 0h27v110h-27zm38 0h9v110h-9zm20 0h22v110h-22zm33 0h8v110h-8zm19 0h18v110h-18zm29 0h11v110h-11z" fill="#253b54"/><path d="M176 184h252" stroke="#4fc7b6" stroke-width="8"/><circle cx="301" cy="271" r="13" fill="#4fc7b6"/></svg>'
};
Object.entries(icons).forEach(function (entry) {
  fs.writeFileSync(path.join(logoDir, entry[0]), entry[1] + "\n");
});
console.log("DeveloperFolio data refreshed with 2026 projects and CV.");
