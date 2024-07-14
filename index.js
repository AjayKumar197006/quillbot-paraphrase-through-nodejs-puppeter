require("dotenv").config();
const puppeteer = require('puppeteer');
const fs=require('fs');



function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
 
  (async ()=>
    {
        for(let i=0;i<3;i++)
        {
            const browser=await puppeteer.launch(
                {
                    headless: false,
                    defaultViewport: null,
                    args: ['--start-maximized']
                }
            );
            
            const page=await browser.newPage();
            await page.goto("https://quillbot.com/paraphrasing-tool");
            await sleep(10000)
            await page.setViewport( { 'width' : 1500, 'height' : 10000 } );
            let fileList=fs.readdirSync("C:\\Users\\NANDULA SINDHURA\\Desktop\\test\\")
            const file=fileList[Math.floor(Math.random()*(fileList.length))]
            const text=fs.readFileSync(process.env.input+file,'utf-8')
            await page.type('xpath=//*[@id="paraphraser-input-box"]',text)
            await sleep(5000)
            await page.click('.css-1fz2g01')
            await sleep(5000)
            const answer=await page.$eval('#paraphraser-output-box',element => element.textContent)
            console.log(answer)
            await sleep(10000)
            const outputpath=process.env.output
            finalpath=outputpath+"\\"+file
        
            fs.writeFileSync(finalpath,answer)
            fs.unlinkSync(process.env.input+file)
            await browser.close()
    

        }
        
        
        
    
        
    
    
        
    
    })();


    
