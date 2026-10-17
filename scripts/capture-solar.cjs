const {chromium}=require(process.env.CAPTURE_MODULE+"/node_modules/playwright-core");const fs=require("fs");
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 fs.mkdirSync("real-project-screenshots",{recursive:true});
 const shots=[["solarhome-home","http://127.0.0.1:5173/"],["solarhome-products","http://127.0.0.1:5173/products"]];
 const summary=[];
 for(const [name,url] of shots){
   const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   try{
    const r=await page.goto(url,{waitUntil:"domcontentloaded",timeout:40000});await page.waitForTimeout(4500);
    const info=await page.evaluate(()=>({title:document.title,text:document.body?.innerText?.slice(0,1100)||""}));
    if(r.status()>=400||info.text.length<35)summary.push({name,status:"not-rendered",http:r.status(),info,errors});
    else{await page.screenshot({path:"real-project-screenshots/"+name+".png",fullPage:false,animations:"disabled"});summary.push({name,status:"captured",http:r.status(),info,errors});}
   }catch(e){summary.push({name,status:"failed",error:String(e),errors});}
   await page.close();
 }
 await browser.close();
 fs.writeFileSync("real-project-screenshots/solar-capture-report.json",JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));
 if(!summary.some(s=>s.status==="captured"))process.exit(1);
})().catch(e=>{console.error(e);process.exit(1)});
