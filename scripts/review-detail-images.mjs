import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {DEMOS} from '../src/data.js';
import {storyImages} from '../src/story-images.js';
const browser=await chromium.launch({headless:true,channel:'msedge'});try{const page=await browser.newPage({viewport:{width:1400,height:1200}});const all=DEMOS.filter(d=>d.linkState==='available').flatMap(d=>(storyImages[d.id]||d.shots).filter(s=>s.image).map(s=>({...s,id:d.id})));
for(let start=0;start<all.length;start+=18){const cards=await Promise.all(all.slice(start,start+18).map(async s=>`<figure><figcaption>${s.id}<br>${s.label||s.cap}</figcaption><img src="data:image/jpeg;base64,${(await fs.readFile('public'+s.image)).toString('base64')}"></figure>`));await page.setContent(`<style>body{margin:10px;background:#ddd;font:12px sans-serif;display:grid;grid-template-columns:repeat(6,1fr);gap:10px}figure{margin:0}figcaption{height:35px}img{width:100%;height:350px;object-fit:cover;object-position:top}</style>${cards.join('')}`);await page.screenshot({path:`docs/detail-rollout/sources-${start}.jpg`,fullPage:true});}
}finally{await browser.close();}
