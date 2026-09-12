/** 建設紹介の原稿。PDF・動画もこの内容を基準に制作する。 */
export const constructionStory = {
  eyebrow: '建設・現場の業務改善',
  title: '現場写真の整理から、報告書と確認業務まで。',
  intro: '現場で撮った写真を探し、内容を確認しながら報告書に貼り直す。その作業を見直してみませんか。写真を整理し、下書きを確認して、事務側へ引き継ぐ。日々の記録業務を変えるヒントを、サンプルで体験できます。',
  audience: '現場監督・事務担当者・工事責任者、業務改善を検討する経営者の方へ',
  problems: [
    '現場作業が終わった後も、写真整理や報告書づくりが残っている。',
    '写真の名前だけでは内容がわからず、開き直したり現場に聞き直したりしている。',
    '報告内容の確認や不足写真の依頼が、電話や個別のやり取りに分かれている。'
  ],
  approach: '写真をデジタルで保存するだけでは、探す・書き写す・確認する作業は残ります。写真を報告に使える形に整え、下書きを人が確認し、管理側へ引き継ぐ。このつながりを作ることが、業務を簡素化する一つの方法です。',
  before: ['写真を一枚ずつ探す', '報告書に貼り直して文章を書く', '提出後の確認や不足依頼を個別に行う'],
  after: ['写真を分類・命名して整理', '下書きをもとに内容を確認・修正', '管理画面で提出内容と確認状況を見る'],
  benefits: [
    { title: '写真を探して整理する手間を見直す', body: '工種ごとの分類と、現場名・工種・日付を含むファイル名への変化をご覧ください。報告に使う写真を見つけやすくする方法を確かめられます。', point: '写真の整理前と整理後を見比べる', path: '/photo', link: '写真整理を試す' },
    { title: '書類を一から作る作業を、下書きの確認へ', body: '写真付きの報告書に、作業内容や進捗などの下書きが入ります。文章を起こす負担を見直し、人が確認・修正する流れを試せます。', point: '日報サンプルから下書きを表示する', path: '/report', link: '報告書の下書きを試す' },
    { title: '提出前に確認し、修正の手戻りを減らす工夫を知る', body: '下書きには「要確認」の表示があります。写真や記載内容を見直し、修正してから帳票へ進む体験を通じて、自社で必要な確認箇所を考えられます。', point: '要確認欄を修正して「確認する」へ進む', path: '/report', link: '確認・修正の流れを見る' },
    { title: '現場と事務の確認・依頼をつなぐ', body: '提出した日報を管理側で開き、確認済みにする流れを試せます。不足写真の催促画面も見ながら、確認や依頼をまとめる方法を検討できます。', point: '提出後に「管理画面で確認」へ進む', path: '/ops', link: '管理側の画面を見る' }
  ],
  steps: [
    { title: '写真を整える', body: '「整理する」を押し、工種別の分類とファイル名の変化を確認。「報告書下書きへ」へ進みます。', image: '/images/demos/construction-record/01.jpg', cap: '写真の整理画面', path: '/photo' },
    { title: '下書きを確認・修正する', body: '「AIで下書き」を押すと、サンプルの文章が入ります。内容を見直し、「確認する」から「提出する」へ進みます。', image: '/images/demos/construction-record/02.jpg', cap: '報告書の画面', path: '/report' },
    { title: '管理側で確認する', body: '「管理画面で確認」から届いた日報を開き、内容を確認。確認済みの表示までをご覧ください。', image: '/images/demos/construction-record/03.jpg', cap: '管理側の画面', path: '/ops' }
  ],
  conditions: [
    '写真整理と報告書のサンプルは、実際の写真のアップロードやAPIキーの用意なしで試せます。分類や下書きには、用意された内容を使います。',
    '「提出」「通知」「催促」はデモ内の体験です。実際の担当者への送信や、業務データのサーバー保存は行いません。',
    '「要確認」は見直す箇所の例です。すべての誤りを検出する機能ではありません。下書き全体を人が確認する前提です。',
    '自分の写真を使う解析はサンプルとは別の機能です。画像がAI APIへ送信されるため、デモ内の利用案内を確認し、機密情報や個人情報を含む写真は使用しないでください。'
  ],
  closing: '体験しながら、今の報告書で毎回書いている項目、現場への聞き直しが多い項目、提出前に確認したい項目を思い浮かべてみてください。自社ではどこを自動化し、どこを人が確認するかを考える材料になります。'
}

export function buildConstructionDetail(d, esc) {
 const c = constructionStory
 const link = (path, label, cls = 'story-link') => '<a class="'+cls+'" href="'+esc(d.url.replace(/\/$/, '')+path)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' <span aria-hidden="true">↗</span><span class="sr-only">（別タブで開きます）</span></a>'
 const list = xs => '<ul>'+xs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'
 const titles = ['探していた写真が、すぐそこに。','一から書く前に、下書きから。','現場の記録を、事務へつなぐ。']
 const captions = ['工種で分類。名前もわかりやすく。','写真と文章を見直して、提出へ。','届いた日報と確認状況を、一か所で。']
 return '<article class="construction-story">'
 + '<header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← 一覧へ</button><span>ideal / 建設・現場</span></header>'
 + '<section class="story-hero" aria-labelledby="detailTitle"><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="12" width="30" height="27" rx="5"/><path d="m13 32 8-9 7 7 4-4 4 6M17 12V8h14v4"/><circle cx="31" cy="20" r="2"/></svg></div><div><p class="story-eyebrow">建設・現場の業務改善</p><h1 id="detailTitle">現場写真から、<br>報告書まで。</h1></div></div><p class="story-intro">写真を整え、下書きを確認。<br>現場と事務をつなぐ流れを、体験できます。</p><div class="story-actions">'+link('/photo','写真整理から体験する','story-button')+'<span class="story-availability">サンプルで体験<br>写真・APIキーの準備不要</span></div><div class="story-meta"><div><span>使う人</span><strong>現場・事務</strong></div><div><span>体験の流れ</span><strong>3ステップ</strong></div><div><span>下書きの仕上げ</span><strong>人が確認</strong></div></div></section>'
 + '<section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">画面で見る、仕事の変化</h2><span>01 — 03 →</span></div><p class="story-swipe-hint">横にスワイプして、3つの画面を見る</p><div class="story-gallery" tabindex="0" role="region" aria-label="3つの実画面。横にスクロールできます">'+c.steps.map((s,i)=>'<figure class="story-preview-card story-preview-'+i+'"><figcaption><span class="story-number">0'+(i+1)+' / '+esc(s.title)+'</span><h3>'+esc(titles[i])+'</h3><p>'+esc(captions[i])+'</p></figcaption><img src="'+esc(s.image)+'" alt="'+esc(s.cap)+'" loading="'+(i===0?'eager':'lazy')+'" width="390" height="844"></figure>').join('')+'</div></section>'
 + '<section class="story-section" id="construction-benefits"><p class="story-eyebrow">この体験でわかること</p><h2>探す・書き写す時間を、<br>確認して仕上げる時間へ。</h2><div class="story-changes">'+c.before.map((b,i)=>'<div><span class="story-number">0'+(i+1)+'</span><div><p>'+esc(b)+'</p><h3>'+esc(c.after[i])+'</h3></div><span aria-hidden="true">↗</span></div>').join('')+'</div><details class="story-disclosure"><summary>どんな業務の悩みに役立つ？</summary><div class="story-disclosure-body"><p>'+esc(c.audience)+'</p>'+list(c.problems)+'<p>'+esc(c.approach)+'</p></div></details><p class="story-note">削減効果は業務や運用によって異なります。このデモでは、改善の方法を確かめられます。</p></section>'
 + '<section class="story-section"><p class="story-eyebrow">気になるところを、もう少し詳しく</p><h2>体験の見どころと進め方</h2><p class="story-section-lead">写真整理から順に進むと、提出後の確認までつながります。</p>'+c.steps.map((s,i)=>'<details class="story-disclosure"><summary><span class="story-number">0'+(i+1)+'</span>'+esc(s.title)+'</summary><div class="story-disclosure-body">'+(i===0?[c.benefits[0]]:i===1?[c.benefits[1],c.benefits[2]]:[c.benefits[3]]).map(b=>'<h3>'+esc(b.title)+'</h3><p>'+esc(b.body)+'</p><p class="story-look"><strong>見るポイント</strong>'+esc(b.point)+'</p>').join('')+'<h3>操作の流れ</h3><p>'+esc(s.body)+'</p>'+(i===1?'<p>下書きから試す場合は「サンプルで試す」から日報サンプルを選びます。スマートフォンでは「体験をはじめる」から進みます。</p>':'')+link(s.path,i===0?'写真整理を試す':i===1?'下書きから試す':'管理側の画面を見る')+'</div></details>').join('')+'</section>'
 + '<section class="story-section story-conditions"><h2>体験について</h2><p class="story-section-lead">用意された写真・文章を使うサンプルです。<br>提出・通知・催促はデモ内の体験で、実際の送信やサーバー保存は行いません。</p><details class="story-disclosure"><summary>体験の範囲と、写真を使う際の注意</summary><div class="story-disclosure-body">'+list(c.conditions)+'</div></details></section>'
 + '<section class="story-closing"><p class="story-eyebrow">自社の仕事に、置き換えてみる</p><h2>毎日の記録を、<br>もう少し軽く。</h2><p>毎回書く項目、聞き直しが多い項目。<br>どの作業を変えたいか、試しながら考えてみませんか。</p>'+link('/photo','写真整理から体験する','story-button')+'<details class="story-disclosure"><summary>自社で使うときに考えたいこと</summary><div class="story-disclosure-body"><p>'+esc(c.closing)+'</p>'+link('','建設デモの入口を見る')+'</div></details></section>'
 + '<nav class="story-section story-related" aria-label="関連する建設デモ"><h2>ほかの建設業務も見る</h2><button type="button" data-goto="field-dandori"><span>電気工事の段取り<small>現場の準備を整える</small></span><span aria-hidden="true">→</span></button><button type="button" data-goto="contractor-matching"><span>協力業者の選定<small>工事に合う業者を探す</small></span><span aria-hidden="true">→</span></button></nav></article>'
}
