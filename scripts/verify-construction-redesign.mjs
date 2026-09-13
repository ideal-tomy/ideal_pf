import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true,channel:"msedge"});
try {
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1280]){
await page.setViewportSize({width,height:844});
await page.goto('http://127.0.0.1:4173/?demo=construction-record');
await page.locator('.story-preview-card img').first().waitFor();
await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
await page.waitForTimeout(500);
const metrics=await page.evaluate(()=>{const d=document.querySelector('#detail');return {width:d.clientWidth,scrollWidth:d.scrollWidth,images:[...document.querySelectorAll('.story-gallery img')].every(i=>i.complete&&i.naturalWidth>0),previewTop:document.querySelector('.story-gallery').getBoundingClientRect().top};});
assert(metrics.scrollWidth<=metrics.width,JSON.stringify(metrics));assert(metrics.images);assert(metrics.previewTop<650);
await page.screenshot({path:`docs/construction-redesign-${width}.png`});
const gallery=page.locator('.story-gallery');await gallery.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(400);
if(width<701) assert(await gallery.evaluate(e=>e.scrollLeft>0));
const summary=page.locator('summary').filter({hasText:'下書きを確認・修正する'});await summary.click();assert(await summary.evaluate(e=>e.parentElement.open));
assert(await page.getByText('提出前に確認し、修正の手戻りを減らす工夫を知る',{exact:true}).isVisible());
await summary.press('Enter');assert(!(await summary.evaluate(e=>e.parentElement.open)));
await page.locator('[data-goto="field-dandori"]').click();assert.equal(new URL(page.url()).searchParams.get('demo'),'field-dandori');
await page.goto('http://127.0.0.1:4173/?demo=construction-record');await page.locator('#dBack').click();assert(new URL(page.url()).searchParams.get('view')==='all');
console.log(width,metrics,'interactions passed');
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/?demo=shift');await page.waitForTimeout(500);await page.screenshot({path:'docs/construction-redesign-reference.png'});
assert.deepEqual(errors,[]);console.log('No page errors');
} finally {await browser.close();}

