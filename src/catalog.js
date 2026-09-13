import { CATEGORIES, ICON } from './data.js'
import { storyImages } from './story-images.js'

// 一覧用の短いコピーと画像。詳細原稿とは独立して編集する。
// [title, description, index?, objectPosition?, image?]
export const catalogCopy = {
 'construction-record':['現場写真から報告書へ','写真整理から下書き、管理側の確認まで。',0,'top','/images/demos/construction-record/01.jpg'],
 'field-dandori':['現場の段取りを組み立てる','申請・人員・書類の準備を見渡す。',0,'top','/images/demos/field-dandori/catalog.jpg'],
 'contractor-matching':['協力業者を比べる','候補のスコアと選定の材料を確認。',0,'top','/images/demos/contractor-matching/catalog.jpg'],
 'quality-incident':['品質トラブルの対応を追う','発見から原因候補、是正・承認へ。',0,'top','/images/demos/quality-incident/01.jpg'],
 'manufacturing-compare':['現場の対応案を比べる','判断の材料と、2つの案の違いを見る。'],
 'product-flow-mfg':['製造の判断を支える','現場判断・手順改定を画面で考える。',0,'top','/images/demos/product-flow-mfg/catalog.jpg'],
 'approval-inspection':['受入検査の照合と承認','照合の結果と、確認する根拠をつなぐ。',0,'top','/images/demos/approval-inspection/catalog.jpg'],
 'inspection-record':['設備の点検を記録する','点検項目の入力から、記録の確認へ。'],
 'cause-demo':['原因分析を順に見る','記録を同じ時間軸に揃える考え方。',0,'top','/images/demos/cause-demo/catalog.jpg'],
 'kaigo-handoff':['申し送り・面談・日報','日々のメモを整理して、記録を確認。',0,'top','/images/demos/kaigo-handoff/01.jpg'],
 'childcare':['保育の記録と連絡','園の出来事を、報告と確認につなぐ。',0,'top','/images/demos/childcare/catalog.jpg'],
 'voice-karte-simple':['短い申し送りを試す','記録がまとまる流れを、短いデモで。',0,'top','/images/demos/voice-karte-simple/catalog.jpg'],
 'pharmacy-transfer':['薬局間で在庫を融通','在庫の依頼から受渡しまでを紹介。'],
 'kaigo-3role':['介護を3つの役割で見る','現場・内勤・医療の画面を見比べる。',0,'top','/images/demos/kaigo-3role/catalog.jpg'],
 'disaster-facility':['防災施設の状態を見る','施設の情報と判断の根拠を確認。',0,'top','/images/demos/disaster-facility/catalog.jpg'],
 'gym-facility':['体育館の施設管理','状態と点検の記録から判断を考える。',0,'top','/images/demos/gym-facility/catalog.jpg'],
 'chiiki-bunka':['地域の語りを旅の案内へ','文化の記録から提案へつなぐ流れ。',0,'top','/images/demos/chiiki-bunka/catalog.jpg'],
 'shift':['希望からシフト案へ','希望の提出、割当案、欠勤対応を確認。',0,'top','/images/demos/shift/01.jpg'],
 'shikomi-record':['仕込みの記録と知見','日々の気づきを、次の仕事に残す。',0,'top','/images/demos/shikomi-record/catalog.jpg'],
 'haken-dash':['派遣営業の状況を見る','候補・案件・収益の情報を見渡す。',0,'top','/images/demos/haken-dash/catalog.jpg'],
 'sfa-legal':['相談案件を次の対応へ','相談から受任判断までの流れを見る。',0,'top','/images/demos/sfa-legal/catalog.jpg'],
 'vietnam-haken':['人材紹介の選考を進める','応募者と企業、選考の進捗を確認。',0,'top','/images/demos/vietnam-haken/catalog.jpg'],
 'property-match':['条件から物件を比べる','物件の順位と提案理由を紹介。'],
 'customer-support':['業種別の案内チャット','問い合わせへの案内と根拠を確認。',0,'top','/images/demos/customer-support/01.jpg'],
 'internal-knowledge':['規程・マニュアルに聞く','社内の用件から、結論と根拠へ。',0,'top','/images/demos/internal-knowledge/catalog.jpg'],
 'assist-reception':['受付の状況を整理する','受付から一覧までの画面構成を紹介。'],
 'expense-optimize':['経費の見直しを考える','業種別のデータと分析の流れを紹介。'],
 'sns-post':['投稿文の下書きをつくる','素材から投稿文へつなぐ画面を紹介。']
}

export function catalogCard(d, esc) {
 const [title,,index=0,position='top',image]=catalogCopy[d.id] || [d.plain,d.one]
 const images=(d.shots || []).filter(s=>s.image)
 const source=images.length?images:(storyImages[d.id] || [])
 const shot=source[index] || source[0]
 const cat=CATEGORIES.find(c=>c.id===d.category)
 const illustration=`/images/catalog/${d.id}.svg`
 return `<button type="button" class="catalog-card" data-id="${esc(d.id)}" aria-label="${esc(title)}の詳細を見る">
   <span class="catalog-art" style="--catalog-color:${esc(cat?.bg || '#40304e')}"><span class="catalog-device"><img src="${esc(image || shot?.image || illustration)}" alt="${esc(shot?.cap || shot?.label || title+'の流れのイメージ')}" loading="lazy" width="800" height="600" style="object-position:center ${esc(position)}"></span><span class="catalog-art-fallback" aria-hidden="true">${ICON[d.icon] || ICON.doc}</span>${!(image || shot)?'<span class="catalog-image-label">流れのイメージ</span>':''}<span class="catalog-open" aria-hidden="true">↗</span><span class="catalog-card-body"><span class="catalog-title">${esc(title)}</span></span></span>
 </button>`
}

export function catalogShelves(demos,esc) {
 return CATEGORIES.map(c=>{
  const items=demos.filter(d=>d.category===c.id)
  if(!items.length)return ''
  return `<section class="catalog-shelf" aria-labelledby="shelf-title-${esc(c.id)}"><header class="catalog-shelf-heading"><div><h2 id="shelf-title-${esc(c.id)}">${esc(c.label)}<span>${items.length}</span></h2><p>${esc(c.desc)}</p></div><div class="catalog-arrows"><button type="button" data-shelf="${esc(c.id)}" data-direction="-1" aria-label="${esc(c.label)}の前のデモ" aria-controls="shelf-${esc(c.id)}">←</button><button type="button" data-shelf="${esc(c.id)}" data-direction="1" aria-label="${esc(c.label)}の次のデモ" aria-controls="shelf-${esc(c.id)}">→</button></div></header><div class="catalog-track" id="shelf-${esc(c.id)}" data-category="${esc(c.id)}" tabindex="0" role="region" aria-label="${esc(c.label)}のデモ一覧">${items.map(d=>catalogCard(d,esc)).join('')}</div></section>`
 }).join('')
}
