import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {DEMOS} from '../src/data.js';
import {hasStory} from '../src/demo-story.js';
const browser=await chromium.launch({headless:true,channel:'msedge'});try{const page=await browser.newPage({viewport:{width:1470,height:1600}});
for(const width of [390,1280])for(const section of ['top','gallery','conditions']){const cards=await Promise.all(DEMOS.filter(hasStory).map(async d=>`<figure><figcaption>${d.id}</figcaption><img src="data:image/jpeg;base64,${(await fs.readFile(`docs/detail-rollout/screens/${d.id}-${width}-${section}.jpg`)).toString('base64')}"></figure>`));await page.setContent(`<style>body{margin:10px;background:#c4c4c4;font:12px sans-serif;display:grid;grid-template-columns:repeat(${width===390?7:4},1fr);gap:10px}figure{margin:0}figcaption{height:20px}img{width:100%;display:block}</style>${cards.join('')}`);await page.screenshot({path:`docs/detail-rollout/review-${width}-${section}.jpg`,fullPage:true});}
}finally{await browser.close();}
