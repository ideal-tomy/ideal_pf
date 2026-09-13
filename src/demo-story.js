import { ICON, categoryLabel, getDemoById } from './data.js'
import { constructionStory } from './construction-story.js'
import { storyCopy } from './demo-stories.js'
import { storyImages } from './story-images.js'

export function hasStory(d) {
  return Boolean(d && d.linkState === 'available' && /^https:\/\//i.test(d.url || ''))
}

const list = (items, esc) => `<ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`
const lines = (text, esc) => (Array.isArray(text) ? text : [text]).map(esc).join('<br>')
const number = i => String(i + 1).padStart(2, '0')

function external(d, path, label, esc, cls = 'story-link') {
  if (!hasStory(d)) return ''
  const url = path ? d.url.replace(/\/$/, '') + path : d.url
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span><span class="sr-only">（別タブで開きます）</span></a>`
}

function disclosure(title, body, esc, index) {
  return `<details class="story-disclosure"><summary>${index == null ? '' : `<span class="story-number">${number(index)}</span>`}${esc(title)}</summary><div class="story-disclosure-body">${body}</div></details>`
}

function constructionModel(d, esc) {
  const c = constructionStory
  const headlines = ['探していた写真が、すぐそこに。', '一から書く前に、下書きから。', '現場の記録を、事務へつなぐ。']
  const captions = ['工種で分類。名前もわかりやすく。', '報告書のサンプルを選ぶ入口。', '届いた日報と確認状況を、一か所で。']
  return {
    title: ['現場写真から、', '報告書まで。'], intro: ['写真を整え、下書きを確認。', '現場と事務をつなぐ流れを、体験できます。'],
    eyebrow: c.eyebrow, meta: [['使う人','現場・事務'],['体験の流れ','3ステップ'],['下書きの仕上げ','人が確認']],
    cta: '写真整理から体験する', path: '/photo',
    previews: c.steps.map((s,i) => ({label:s.title,headline:headlines[i],caption:captions[i],image:s.image,alt:s.cap})),
    changeTitle:['探す・書き写す時間を、','確認して仕上げる時間へ。'], changes:c.before.map((b,i)=>[b,c.after[i]]),
    background:`<p>${esc(c.audience)}</p>${list(c.problems,esc)}<p>${esc(c.approach)}</p>`,
    note:'削減効果は業務や運用によって異なります。このデモでは、改善の方法を確かめられます。',
    detailsLead:'写真整理から順に進むと、提出後の確認までつながります。',
    details:c.steps.map((s,i)=>({title:s.title,body:(i===0?[c.benefits[0]]:i===1?[c.benefits[1],c.benefits[2]]:[c.benefits[3]]).map(b=>`<h3>${esc(b.title)}</h3><p>${esc(b.body)}</p><p class="story-look"><strong>見るポイント</strong>${esc(b.point)}</p>`).join('')+`<h3>操作の流れ</h3><p>${esc(s.body)}</p>`+(i===1?'<p>下書きから試す場合は「サンプルで試す」から日報サンプルを選びます。スマートフォンでは「体験をはじめる」から進みます。</p>':'')+external(d,s.path,i===0?'写真整理を試す':i===1?'下書きから試す':'管理側の画面を見る',esc)})),
    conditionSummary:['用意された写真・文章を使うサンプルです。','提出・通知・催促はデモ内の体験で、実際の送信やサーバー保存は行いません。'],
    conditionTitle:'体験の範囲と、写真を使う際の注意',conditionBody:list(c.conditions,esc),
    closingTitle:['毎日の記録を、','もう少し軽く。'],closing:['毎回書く項目、聞き直しが多い項目。','どの作業を変えたいか、試しながら考えてみませんか。'],
    closingDetail:`<p>${esc(c.closing)}</p>${external(d,'','建設デモの入口を見る',esc)}`,
    related:['field-dandori','contractor-matching']
  }
}

function demoModel(d, esc) {
  const copy=storyCopy[d.id]
  const rawShots=(d.shots || []).map(s=>Array.isArray(s)?{cap:s[1]}:s)
  const images=storyImages[d.id] || []
  const labels=rawShots.map(s=>s.cap)
  const previews=rawShots.map((s,i)=>{
    const fresh=images[i]
    const image=s.image || fresh?.image
    const label=fresh?.label || s.cap
    return {label,headline:fresh?.headline || copy?.headlines[i] || label,
      caption:image ? label : '仕組みのイメージ',image,alt:label,
      diagram:labels,active:i,point:(d.can || [])[Math.min(i,(d.can || []).length-1)] || d.one}
  })
  return {
    title:copy?.title || d.plain,intro:copy?.intro || d.one,eyebrow:categoryLabel(d.category)+'の業務改善',
    meta:[['使う人',(d.audience || categoryLabel(d.category)).split('と')[0].split('・').slice(0,2).join('・')],['見られる内容',copy?.mode || '画面紹介'],['公開状態','体験版あり']],
    cta:copy?.mode === '説明デモ' ? '説明の流れを見る' : copy?.mode === '画面紹介' ? '体験版の画面を見る' : '体験版を開く',path:'',previews,
    changeTitle:'この仕事を、見直すきっかけに。',changes:copy?.changes || [],
    background:`<p>${esc(d.audience || '')}</p><p>${esc(d.when || '')}</p><p>${esc(d.lead || d.one)}</p>`,
    detailsLead:'気になる項目を開くと、このデモで見られる内容を確認できます。',
    details:(d.can || []).map((text,i)=>({title:(copy?.detailTitles || copy?.headlines)?.[i] || '見られること '+number(i),body:`<p>${esc(text)}</p><p class="story-look"><strong>見るポイント</strong>${esc(copy?.changes[Math.min(i,copy.changes.length-1)]?.[1] || text)}</p>`})),
    conditionSummary:d.experienceNote || '体験版の入口で利用案内をご確認ください。',
    conditionTitle:'体験の範囲について',conditionBody:copy?.limits?.length ? list(copy.limits,esc) : '',
    closingTitle:['自社の仕事なら、','どこが変わるか。'],closing:copy?.question || d.when,related:d.relatedIds || []
  }
}

function preview(p,i,esc) {
  const visual=p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="${i===0?'eager':'lazy'}" width="390" height="844">`
    : `<div class="story-diagram"><span class="story-diagram-label">機能のイメージ</span><ol>${p.diagram.map((label,j)=>`<li class="${j===p.active?'is-current':''}"><span>${number(j)}</span><strong>${esc(label)}</strong></li>`).join('')}</ol><p>${esc(p.point)}</p></div>`
  return `<figure class="story-preview-card story-preview-${i}"><figcaption><span class="story-number">${number(i)} / ${esc(p.label)}</span><h3>${esc(p.headline)}</h3><p>${esc(p.caption)}</p></figcaption>${visual}</figure>`
}

export function buildDemoStory(d,esc) {
  const m=d.id==='construction-record'?constructionModel(d,esc):demoModel(d,esc)
  const category=categoryLabel(d.category)
  const related=[...new Set(m.related)].map(getDemoById).filter(x=>x && x.id!==d.id && x.listed!==false).slice(0,4)
  return `<article class="demo-story story-theme-${esc(d.category)}">
    <header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← 一覧へ</button><span>ideal / ${esc(category)}</span></header>
    <section class="story-hero" aria-labelledby="detailTitle"><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true">${ICON[d.icon] || ICON.doc}</div><div><p class="story-eyebrow">${esc(m.eyebrow)}</p><h1 id="detailTitle">${lines(m.title,esc)}</h1></div></div><p class="story-intro">${lines(m.intro,esc)}</p><div class="story-actions">${external(d,m.path,m.cta,esc,'story-button')}</div><div class="story-meta">${m.meta.map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></section>
    <section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">画面で見る、仕事の変化</h2></div><div class="story-gallery" tabindex="0" role="region" aria-label="${m.previews.length}つのプレビュー。横にスクロールできます">${m.previews.map((p,i)=>preview(p,i,esc)).join('')}</div></section>
    <section class="story-section" id="story-benefits"><p class="story-eyebrow">この体験でわかること</p><h2>${lines(m.changeTitle,esc)}</h2><div class="story-changes">${m.changes.map(([before,after],i)=>`<div><span class="story-number">${number(i)}</span><div><p>${esc(before)}</p><h3>${esc(after)}</h3></div><span aria-hidden="true">↗</span></div>`).join('')}</div>${disclosure('どんな業務の悩みに役立つ？',m.background,esc)}${m.note?`<p class="story-note">${esc(m.note)}</p>`:''}</section>
    <section class="story-section"><p class="story-eyebrow">気になるところを、もう少し詳しく</p><h2>体験の見どころと進め方</h2><p class="story-section-lead">${esc(m.detailsLead)}</p>${m.details.map((s,i)=>disclosure(s.title,s.body,esc,i)).join('')}</section>
    <section class="story-section story-conditions"><h2>体験について</h2><p class="story-section-lead">${lines(m.conditionSummary,esc)}</p>${m.conditionBody?disclosure(m.conditionTitle,m.conditionBody,esc):''}</section>
    <section class="story-closing"><p class="story-eyebrow">自社の仕事に、置き換えてみる</p><h2>${lines(m.closingTitle,esc)}</h2><p>${lines(m.closing,esc)}</p>${external(d,m.path,m.cta,esc,'story-button')}${m.closingDetail?disclosure('自社で使うときに考えたいこと',m.closingDetail,esc):''}</section>
    ${related.length?`<nav class="story-section story-related" aria-label="関連するデモ"><h2>関連するデモも見る</h2>${related.map(x=>`<button type="button" data-goto="${esc(x.id)}"><span>${esc(x.plain)}<small>${esc(categoryLabel(x.category))}</small></span><span aria-hidden="true">→</span></button>`).join('')}</nav>`:''}
  </article>`
}
