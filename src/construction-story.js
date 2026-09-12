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
  const link = (path, label, cls = 'story-link') => `<a class="${cls}" href="${esc(d.url.replace(/\/$/, '') + path)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span aria-hidden="true"> ↗</span><span class="sr-only">（別タブで開きます）</span></a>`
  const list = items => `<ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`
  return `<article class="construction-story">
    <header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← デモ一覧に戻る</button><span>ideal / 建設</span></header>
    <section class="story-hero" aria-labelledby="detailTitle">
      <p class="story-eyebrow">${esc(c.eyebrow)}</p>
      <h1 id="detailTitle">${esc(c.title)}</h1>
      <p class="story-intro">${esc(c.intro)}</p>
      <p class="story-audience">${esc(c.audience)}</p>
      <div class="story-actions">${link('/photo', '写真整理から体験する', 'story-button')}<button type="button" class="story-link" data-story-scroll="construction-benefits">改善のポイントを読む ↓</button></div>
      <p class="story-note">用意されたサンプルで体験できます。実写真の準備は不要です。</p>
      <div class="story-flow" aria-label="体験の流れ"><span>写真を整える</span><b aria-hidden="true">→</b><span>下書きを確認</span><b aria-hidden="true">→</b><span>管理側へ</span></div>
    </section>
    <section class="story-section"><p class="story-eyebrow">こんなお困りごとはありませんか</p><h2>記録のための作業が、<br>現場の負担になっている。</h2>${list(c.problems)}</section>
    <section class="story-section"><p class="story-eyebrow">解決の考え方</p><h2>「探す・書き写す」から、<br>「確認して仕上げる」へ。</h2><p>${esc(c.approach)}</p>
      <div class="story-comparison"><div><h3>今の業務で起きがちなこと</h3>${list(c.before)}</div><div><h3>デモで見る改善の流れ</h3>${list(c.after)}</div></div>
    </section>
    <section id="construction-benefits" class="story-section" tabindex="-1"><p class="story-eyebrow">このデモで確かめられること</p><h2>自社の仕事を見直す、<br>4つのポイント。</h2><p>気になる作業から試しても、写真整理から順に進めても構いません。</p>
      <ul class="story-benefits">${c.benefits.map((b, i) => `<li><span class="story-number">0${i + 1}</span><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p><p class="story-look"><strong>見るポイント</strong>${esc(b.point)}</p>${link(b.path, b.link)}</li>`).join('')}</ul>
      <p class="story-note">作業時間や手戻りの削減効果は、業務や運用によって異なります。デモでは改善の方法を確かめられます。</p>
    </section>
    <section class="story-section"><p class="story-eyebrow">初めての方へ</p><h2>まずは、3つの流れを<br>つなげてお試しください。</h2><p>最初の「写真整理」から進むと、報告書の下書き、提出、管理側の確認までをご覧いただけます。</p>
      <ol class="story-steps">${c.steps.map((s, i) => `<li><figure><img src="${esc(s.image)}" alt="${esc(s.cap)}" loading="lazy" width="390" height="844"><figcaption>${esc(s.cap)}</figcaption></figure><div><span class="story-number">STEP 0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div></li>`).join('')}</ol>
      <div class="story-actions">${link('/photo', '写真整理から体験する', 'story-button')}${link('/report', '下書きだけ先に試す')}</div><p class="story-note">下書きから試す場合は、画面の「サンプルで試す」から日報サンプルを選んでください。スマートフォンでは「体験をはじめる」から進みます。</p>
    </section>
    <section class="story-section story-conditions"><h2>体験の範囲について</h2>${list(c.conditions)}</section>
    <section class="story-section story-closing"><p class="story-eyebrow">自社で使うなら</p><h2>どの作業が変わると、<br>現場がもっと楽になるか。</h2><p>${esc(c.closing)}</p><div class="story-actions">${link('', '建設デモの入口を開く', 'story-button')}</div></section>
    <nav class="story-section story-related" aria-label="関連する建設デモ"><h2>ほかの建設業務も見る</h2><button type="button" data-goto="field-dandori">電気工事の段取り <span aria-hidden="true">→</span></button><button type="button" data-goto="contractor-matching">協力業者の選定 <span aria-hidden="true">→</span></button></nav>
  </article>`
}
