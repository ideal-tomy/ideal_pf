import { writeFileSync } from 'node:fs'
import { constructionStory as c } from '../src/construction-story.js'

const bullets = xs => xs.map(x => `- ${x}`).join('\n')
const text = `# 建設デモ 詳細ページ原稿

原稿の基準：src/construction-story.js。変更後は node scripts/export-construction-copy.mjs で本書を更新する。
用途：公開ページの読み物版。今後の説明資料・動画はこの内容を基準にする。

## ${c.title}

${c.intro}

${c.audience}

[写真整理から体験する](https://construction-demo-six.vercel.app/photo)

用意されたサンプルで体験できます。実写真の準備は不要です。

写真を整える → 下書きを確認 → 管理側へ

## こんなお困りごとはありませんか

### 記録のための作業が、現場の負担になっている。

${bullets(c.problems)}

## 解決の考え方

### 「探す・書き写す」から、「確認して仕上げる」へ。

${c.approach}

| 今の業務で起きがちなこと | デモで見る改善の流れ |
|---|---|
${c.before.map((x, i) => `| ${x} | ${c.after[i]} |`).join('\n')}

## このデモで確かめられること

### 自社の仕事を見直す、4つのポイント。

気になる作業から試しても、写真整理から順に進めても構いません。

${c.benefits.map((b, i) => `### ${i + 1}. ${b.title}\n\n${b.body}\n\n**見るポイント：** ${b.point}\n\n[${b.link}](https://construction-demo-six.vercel.app${b.path})`).join('\n\n')}

作業時間や手戻りの削減効果は、業務や運用によって異なります。デモでは改善の方法を確かめられます。

## 初めての方へ

### まずは、3つの流れをつなげてお試しください。

最初の「写真整理」から進むと、報告書の下書き、提出、管理側の確認までをご覧いただけます。

${c.steps.map((s, i) => `### STEP ${i + 1} ${s.title}\n\n${s.body}`).join('\n\n')}

[写真整理から体験する](https://construction-demo-six.vercel.app/photo) ／ [下書きだけ先に試す](https://construction-demo-six.vercel.app/report)

下書きから試す場合は、画面の「サンプルで試す」から日報サンプルを選んでください。スマートフォンでは「体験をはじめる」から進みます。

## 体験の範囲について

${bullets(c.conditions)}

## 自社で使うなら

### どの作業が変わると、現場がもっと楽になるか。

${c.closing}

[建設デモの入口を開く](https://construction-demo-six.vercel.app/)

## 関連する建設デモ

- 電気工事の段取り
- 協力業者の選定
`
writeFileSync(new URL('../docs/construction-page-copy.md', import.meta.url), text)
console.log('建設ページ原稿を更新しました。')
