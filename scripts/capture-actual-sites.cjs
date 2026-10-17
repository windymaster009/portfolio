const {chromium} = require(process.env.CAPTURE_MODULE + "/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");

(async () => {
  const executablePath = process.env.CHROME_BIN || "/usr/bin/google-chrome";
  const browser = await chromium.launch({
    executablePath, headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const tasks = [
    ["solarhome-home", "http://127.0.0.1:5173/"],
    ["solarhome-products", "http://127.0.0.1:5173/products"],
    ["sonic-automotive-home", "http://127.0.0.1:5174/"],
    ["sonic-automotive-bmw", "http://127.0.0.1:5174/bmw"]
  ];
  fs.mkdirSync("real-project-screenshots", {recursive: true});
  const summary = [];
  for (const [name, url] of tasks) {
    const page = await browser.newPage({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
    const errors = [];
    page.on("pageerror", err => errors.push(err.message));
    try {
      const response = await page.goto(url, {waitUntil: "domcontentloaded", timeout: 35000});
      await page.waitForTimeout(6500);
      const info = await page.evaluate(() => ({
        title: document.title,
        text: document.body?.innerText?.slice(0, 900) || "",
        bodyHeight: document.body?.scrollHeight || 0,
        rootChildren: document.getElementById("app")?.children.length || document.getElementById("root")?.children.length || 0
      }));
      if ((response && response.status() >= 400) || info.text.trim().length < 35) {
        summary.push({name,url,status:"skipped-unrendered",http:response?.status(),info,errors});
      } else {
        const file = path.join("real-project-screenshots", name + ".png");
        await page.screenshot({path:file,fullPage:false,animations:"disabled"});
        summary.push({name,url,status:"captured",http:response?.status(),info,errors});
      }
    } catch(err) {
      summary.push({name,url,status:"failed",error:String(err),errors});
    }
    await page.close();
  }
  await browser.close();
  fs.writeFileSync("real-project-screenshots/capture-report.json", JSON.stringify(summary,null,2));
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.some(item => item.status==="captured")) process.exit(1);
})().catch(e => {console.error(e);process.exit(1)});
