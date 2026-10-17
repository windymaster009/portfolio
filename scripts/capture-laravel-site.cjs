const {chromium}=require(process.env.CAPTURE_MODULE+"/node_modules/playwright-core");
const fs=require("fs"); const path=require("path");
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 const targets=[["laravel-e-shop-home","http://127.0.0.1:8000/"],["laravel-e-shop-products","http://127.0.0.1:8000/product-grids"]];
 fs.mkdirSync("real-project-screenshots",{recursive:true});
 const results=[];
 for(const [name,url] of targets){
   const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   try{
     const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:50000});
     await page.waitForTimeout(3500);
     const info=await page.evaluate(()=>({title:document.title,text:document.body?.innerText?.slice(0,1200)||""}));
     if((res && res.status()>=400)||info.text.includes("Whoops!")||info.text.includes("Internal Server Error")||info.text.length<50){
       results.push({name,url,status:"not-captured",http:res?.status(),info,errors});
     }else{
       await page.screenshot({path:"real-project-screenshots/"+name+".png",fullPage:false,animations:"disabled"});
       results.push({name,url,status:"captured",http:res?.status(),info,errors});
     }
   }catch(e){results.push({name,url,status:"failed",error:String(e),errors});}
   await page.close();
 }
 await browser.close();
 fs.writeFileSync("real-project-screenshots/laravel-capture-report.json",JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 if(!results.some(r=>r.status==="captured"))process.exit(1);
})().catch(e=>{console.error(e);process.exit(1)});
