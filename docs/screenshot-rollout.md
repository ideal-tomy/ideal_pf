# URL付きデモのスクショ／ヒーロー展開

作成日：2026-09-11  
対象：`ideal_pf` の詳細下層（3枚）と、詳細ヒーロー／トップカードの斜め端末

トップのおすすめ5件は実装済み。残りは **同じデータ形に `image` を足すだけ**で、ヒーローも下層も実画像になる。描画コードの追加は原則不要。

## すでに入っている仕組み

| 場所 | 動き |
|---|---|
| `shots[].image` あり | 詳細の横スクロール3枚が実画像 |
| 先頭の `image` | 詳細ヒーローと、トップ sticky カードの斜め端末に同じ1枚を切り出す |
| `image` なし | 従来の CSS 模式図（`.scr` / `.amock`） |

保存先は `public/images/demos/<id>/01.jpg` `02.jpg` `03.jpg`。Vite は `public/` をルート配信する。

データ形：

```js
shots: [
  { key: 'form', cap: '質問する', image: '/images/demos/internal-knowledge/01.jpg' },
  { key: 'list', cap: '根拠を見る', image: '/images/demos/internal-knowledge/02.jpg' },
  { key: 'form', cap: '資料を入れる', image: '/images/demos/internal-knowledge/03.jpg' }
]
```

旧形式 `['form','質問する']` も読める。`image` を足すときにオブジェクトへ直す。

先頭の1枚がヒーローになるので、**いちばん印象の強い画面を 01 にする**（申し送りは録音HUD、建設は写真格子、など）。

## 撮影ルール

- 幅 **390×844**、`deviceScaleFactor: 2`、JPEG quality 84 前後
- ログイン・同意・サンプル案内があれば閉じてから撮る
- 3枚は画面が違うこと（ファイルサイズやハッシュが同じなら撮り直し）
- 到達できない画面は入口＋近い2画面で埋め、キャプションを実画面に合わせる
- 個人情報・実名は写さない（デモの架空名は可）
- 生成AI画像は使わない
- カード全面に写真は貼らない。端末フレーム内だけ

撮影スクリプトの置き場：`scripts/capture-featured.mjs`（おすすめ5件）。残りは同型で `scripts/capture-available.mjs` を足すか、件ごとに関数を追加する。

## 残件（URLあり・未撮影）16件

キャプションは現行 `shots` を初期値にする。実画面と違ったら撮ったあと直す。

### 1. 介護・保育

| ID | URL | 3枚の狙い（現行キャプション） |
|---|---|---|
| `voice-karte-simple` | lambent-smakager-7bcf0a.netlify.app | メモ / 整理 / 結果 |
| `kaigo-3role` | kaigo-operation-demo.vercel.app | 現場 / 内勤 / 医療連携 |
| `childcare` | ideal-tomy.github.io/childcare_demo | 記録する / 確認する / 帳票 |

### 2. 製造

| ID | URL | 3枚の狙い |
|---|---|---|
| `approval-inspection` | approval-diagram.vercel.app | 照合 / 保留・承認 / 基準 |
| `cause-demo` | cause-demo.vercel.app | 状況 / 原因 / 説明 |
| `product-flow-mfg` | product-flow-jet.vercel.app/manufacturing | 質問する / 回答を見る / 次の判断 |

### 3. 建設

| ID | URL | 3枚の狙い |
|---|---|---|
| `contractor-matching` | hookapp-demo.vercel.app | 候補を見る / スコア / 応答 |
| `field-dandori` | rainbow-tarsier-5ce845.netlify.app | 条件を入れる / 計画 / 出力 |

### 4. 自治体・地域

| ID | URL | 3枚の狙い |
|---|---|---|
| `disaster-facility` | disaster-prevention-demo.vercel.app | 施設を選ぶ / 状態を見る / 判断する |
| `gym-facility` | disaster-prevention-demo02.vercel.app | 施設 / カルテ / 判断 |
| `chiiki-bunka` | chiiki-demo-site.vercel.app | 地域 / 提案 / 詳細 |

### 5. 飲食・ナレッジ・人材

| ID | URL | 3枚の狙い |
|---|---|---|
| `shikomi-record` | shikomi-record-demo.vercel.app | 状況を見る / 記録する / 知見 |
| `internal-knowledge` | internal-knowledge-demo.vercel.app | 質問する / 根拠を見る / 資料を入れる |
| `haken-dash` | haken-dash.vercel.app | 案件 / 候補 / 更新 |
| `sfa-legal` | sfa-legal.vercel.app | 受付 / 判断 / 次アクション |
| `vietnam-haken` | vietnam-demo-zeta.vercel.app | 候補 / マッチ / 進捗 |

## URLなし（今は撮らない）7件

`linkState: preparing` のまま。公開URLが付いたら、上と同じ手順で `image` を足す。

- `manufacturing-compare`
- `assist-reception`
- `inspection-record`
- `expense-optimize`
- `pharmacy-transfer`
- `property-match`
- `sns-post`

## 1件あたりの作業

1. 本番URLを 390px で開き、撮る3画面を決める（現行キャプションを起点）
2. `public/images/demos/<id>/01-03.jpg` に保存
3. `src/data.js` の `shots` を `{ key, cap, image }` にする。01 はヒーロー向けに選ぶ
4. 詳細 `?demo=<id>` で下層3枚とヒーロー端末を確認
5. 問題なければ `main` へ（まとめて数件でも可）

ヒーロー用の CSS/SVG 追加は不要。`firstShotImage()` が先頭画像を端末に入れる。

## 進め方

一度に16件撮るとクリック失敗で同一画像が並びやすいので、上のグループ単位（3〜4件）で撮って確認する。

おすすめ5件のやり直しは、`node scripts/capture-featured.mjs`。申し送りの 01 は面談 `/karte` で「録音の同意」→「録音」した RecHud（大きいマイク）を使う。
