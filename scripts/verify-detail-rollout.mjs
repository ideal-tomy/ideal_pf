import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {DEMOS} from '../src/data.js';
import {hasStory,buildDemoStory} from '../src/demo-story.js';
const targets=DEMOS.filter(hasStory),excluded=DEMOS.filter(d=>!hasStory(d));
assert.equal(targets.length,21);assert.equal(excluded.length,7);
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const d of targets){const html=buildDemoStory(d,esc);if(d.id!=='construction-record'){for(const t of d.can)assert(html.includes(esc(t)),d.id+': missing capability');assert(html.includes(esc(d.experienceNote)));assert(html.includes(esc(d.when)));}assert(!html.includes('story-swipe-hint'));assert(!html.includes('story-availability'));}
await fs.mkdir('docs/detail-rollout/screens',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'});const results=[];const errors=[];
try{const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
for(const width of [390,1280])for(const d of targets){
await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:4173/?demo='+d.id);await page.waitForTimeout(450);
await page.evaluate(()=>Promise.all([...document.querySelectorAll('.demo-story img')].map(i=>i.decode())));
assert.equal(await page.locator('.demo-story').count(),1,d.id);
assert.equal(await page.locator('.story-preview-card').count(),3);
const layout=await page.locator('#detail').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));assert(layout.scroll<=layout.width,d.id+': overflow');
const cardSizes=await page.locator('.story-preview-card').evaluateAll(es=>es.map(e=>Math.round(e.getBoundingClientRect().height)));assert(cardSizes.every(h=>h<=620),d.id+': '+cardSizes);
const top=await page.locator('.story-gallery').evaluate(e=>e.getBoundingClientRect().top);assert(top<720,d.id+': gallery too low '+top);
await page.screenshot({path:`docs/detail-rollout/screens/${d.id}-${width}-top.jpg`,type:'jpeg',quality:75});
await page.locator('.story-preview').evaluate(e=>e.scrollIntoView({block:'start'}));await page.screenshot({path:`docs/detail-rollout/screens/${d.id}-${width}-gallery.jpg`,type:'jpeg',quality:75});
const summary=page.locator('.story-disclosure summary').first();await summary.click();assert(await summary.evaluate(e=>e.parentElement.open));await summary.press('Enter');assert(!(await summary.evaluate(e=>e.parentElement.open)));
await page.locator('.story-conditions').evaluate(e=>e.scrollIntoView({block:'start'}));await page.screenshot({path:`docs/detail-rollout/screens/${d.id}-${width}-conditions.jpg`,type:'jpeg',quality:75});
await page.locator('#dBack').focus();await page.keyboard.press('Shift+Tab');assert(await page.locator('#detail').evaluate(e=>e.contains(document.activeElement)));
await page.locator('#dBack').click();assert.equal(new URL(page.url()).searchParams.get('view'),'all');
results.push({id:d.id,width,cardSizes,previewTop:Math.round(top),passed:true});console.log(d.id,width,'passed');
}
for(const d of excluded){await page.goto('http://127.0.0.1:4173/?demo='+d.id);assert.equal(await page.locator('.demo-story').count(),0);assert.equal(await page.locator('.d-head h1').innerText(),d.plain);assert.equal(await page.locator('.d-in-story').count(),0);}
for(const width of [320,430,700,768])for(const id of ['construction-record','internal-knowledge','kaigo-3role','sfa-legal']){await page.setViewportSize({width,height:600});await page.goto('http://127.0.0.1:4173/?demo='+id);assert(await page.locator('#detail').evaluate(e=>e.scrollWidth<=e.clientWidth),id+': narrow overflow');}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/?view=all&cat=construction&q=現場');await page.locator('#allList [data-id="construction-record"]').click();await page.locator('[data-goto="field-dandori"]').click();await page.goBack();assert.equal(new URL(page.url()).searchParams.get('demo'),'construction-record');await page.goForward();assert.equal(new URL(page.url()).searchParams.get('demo'),'field-dandori');await page.locator('#dBack').click();assert.equal(new URL(page.url()).searchParams.get('cat'),'construction');assert.equal(new URL(page.url()).searchParams.get('q'),'現場');assert(await page.locator('body').evaluate(()=>![...document.querySelectorAll('body > *')].some(e=>e.inert)));
await page.goto('http://127.0.0.1:4173/?demo=missing-id');assert.equal(new URL(page.url()).searchParams.get('view'),'all');
assert.deepEqual(errors,[]);await fs.writeFile('docs/detail-rollout/verification.json',JSON.stringify({targets:targets.length,excluded:excluded.length,results,errors},null,2));
}finally{await browser.close();}
