import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {DEMOS,CATEGORIES} from '../src/data.js';
const browser=await chromium.launch({headless:true,channel:'msedge'});await fs.mkdir('docs/catalog-review',{recursive:true});
try{const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1280]){
await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:4173/?view=all');await page.waitForTimeout(400);
assert.equal(await page.locator('.catalog-shelf').count(),8);assert.equal(await page.locator('.catalog-card').count(),28);
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.locator('.catalog-card img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
const titles=await page.locator('.catalog-title').evaluateAll(es=>es.map(e=>{const cs=getComputedStyle(e);const line=parseFloat(cs.lineHeight);return{height:e.getBoundingClientRect().height,line,min:parseFloat(cs.minHeight)};}));assert(titles.every(t=>t.height>=t.line*2-0.5&&t.height<=t.line*2+1));assert.equal(await page.locator('.catalog-description').count(),0);
if(width===390||width===1280){await page.screenshot({path:`docs/catalog-review/catalog-${width}.png`});await page.locator('[aria-labelledby="shelf-title-factory"]').scrollIntoViewIfNeeded();await page.screenshot({path:`docs/catalog-review/factory-${width}.png`});}
console.log('layout',width,'passed');}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/?view=all');
const track=page.locator('#shelf-factory');await track.scrollIntoViewIfNeeded();await track.evaluate(e=>e.scrollLeft=320);await page.waitForTimeout(300);
const card=track.locator('.catalog-card').nth(1);await card.focus();const saved=await page.evaluate(()=>({y:scrollY,x:document.querySelector('#shelf-factory').scrollLeft}));await card.click();await page.locator('#dBack').click();await page.waitForTimeout(500);const restored=await page.evaluate(()=>({y:scrollY,x:document.querySelector('#shelf-factory').scrollLeft}));assert(Math.abs(saved.y-restored.y)<3,JSON.stringify({saved,restored}));assert(Math.abs(saved.x-restored.x)<3,JSON.stringify({saved,restored}));
await page.getByRole('button',{name:'建設・現場',exact:true}).click();assert.equal(await page.locator('.catalog-shelf').count(),1);assert.equal(await page.locator('.catalog-card').count(),3);
await page.locator('#q').fill('写真');assert.equal(await page.locator('.catalog-card').count(),1);await page.locator('.catalog-card').click();await page.locator('#dBack').click();assert.equal(await page.locator('#q').inputValue(),'写真');assert.equal(new URL(page.url()).searchParams.get('cat'),'construction');
await page.locator('#q').fill('存在しない検索語');assert(await page.locator('#allEmpty').isVisible());await page.getByRole('button',{name:'条件をすべて解除'}).click();assert.equal(await page.locator('.catalog-card').count(),28);
for(const c of CATEGORIES){await page.goto('http://127.0.0.1:4173/?view=all&cat='+c.id);assert.equal(await page.locator('.catalog-card').count(),DEMOS.filter(d=>d.listed!==false&&d.category===c.id).length);}
await page.setViewportSize({width:1280,height:844});await page.goto('http://127.0.0.1:4173/?view=all');const right=page.locator('[data-shelf="care"][data-direction="1"]');await right.click();await page.waitForTimeout(600);assert(await page.locator('#shelf-care').evaluate(e=>e.scrollLeft>0));
await page.goto('http://127.0.0.1:4173/?view=all&cat=factory');await page.locator('#allList [data-id="quality-incident"]').click();await page.goBack();assert.equal(new URL(page.url()).searchParams.get('view'),'all');assert.equal(await page.locator('.catalog-shelf').count(),1);await page.goForward();assert.equal(new URL(page.url()).searchParams.get('demo'),'quality-incident');await page.locator('#dBack').click();assert.equal(new URL(page.url()).searchParams.get('cat'),'factory');
await page.goto('http://127.0.0.1:4173/');assert(!(await page.locator('body').evaluate(e=>e.classList.contains('catalog-mode'))));assert.equal(await page.locator('#cards .card').count(),5);
assert.deepEqual(errors,[]);console.log('search / category / empty / arrows / prepared detail / scroll restore / history / home passed');
await fs.writeFile('docs/catalog-review/verification.json',JSON.stringify({widths:[320,390,768,1280],cards:28,shelves:8,scroll:{saved,restored},errors},null,2));
}finally{await browser.close();}
