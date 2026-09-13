import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {DEMOS} from '../src/data.js';
// 公開画面で確認した、画面切り替えだけを行う入口。
const nav={
 'contractor-matching':[['協業マッチング','協業マッチング'],['選定アシスタント','選定アシスタント']],
 'shikomi-record':[['職人の画面','職人の画面'],['経営の画面','経営の画面']],
 'childcare':[['今日の様子を開く','今日の様子'],['できた報告書を見る','報告書の一覧']],
 'disaster-facility':[['コンソールを開く','施設コンソール']],
 'gym-facility':[['管理画面を開く','施設管理画面']],
 'cause-demo':[['仕組みを見る','原因分析の説明']],
 'haken-dash':[['候補者','候補者'],['収益','収益']],
 'sfa-legal':[['案件進行をみる','案件進行'],['顧客一覧をみる','顧客一覧']],
 'vietnam-haken':[['応募者','応募者'],['進捗管理','進捗管理']],
 'kaigo-3role':[['内勤・管理者','内勤・管理者'],['医療連携（外部）','医療連携']],
 'approval-inspection':[['体験する','受入検査の体験画面']],
 'product-flow-mfg':[['現場判断','現場判断'],['手順改定・教育','手順改定・教育']]
};
const browser=await chromium.launch({headless:true,channel:'msedge'});const results={};
try{let cursor=0;const entries=Object.entries(nav);await Promise.all(Array.from({length:3},async()=>{while(cursor<entries.length){const [id,actions]=entries[cursor++];results[id]=[];for(const [i,[name,label]] of actions.entries()){const page=await browser.newPage({viewport:{width:390,height:844}});try{await page.goto(DEMOS.find(d=>d.id===id).url,{waitUntil:'domcontentloaded',timeout:25000});await page.waitForTimeout(600);const before=await page.locator('body').innerText();const target=page.getByRole('button',{name,exact:false}).or(page.getByRole('link',{name,exact:false})).first();await target.click({timeout:3500});await page.waitForTimeout(1300);const body=await page.locator('body').innerText();if(body===before)throw Error('No text change');const image=`/images/demos/${id}/view-${i+1}.jpg`;await page.screenshot({path:'public'+image,type:'jpeg',quality:82});results[id].push({image,label,url:page.url(),body:body.slice(0,9000)});console.log(id,label,'captured');}catch(e){console.log(id,name,e.message.slice(0,90));}finally{await page.close();}}}}));}finally{await browser.close();await fs.writeFile('docs/detail-rollout/navigation-audit.json',JSON.stringify(results,null,2));}
