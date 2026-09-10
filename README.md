# ideal_pf

ideal合同会社の公開デモ紹介ページ（Vite 静的ホスト）。

- トップ: おすすめ大カード 5件
- 全件一覧: 掲載 28件（通常行）
- 紹介: 全画面オーバーレイ（`?demo=<id>` で共有可）
- 外部デモ URL は `src/data.js` の `url` / `linkState` で管理

本番: https://ideal-pf.vercel.app

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## データの直し方

公開用データは [`src/data.js`](src/data.js) のみ。

| フィールド | 意味 |
|---|---|
| `featuredOrder` | トップ大カードの並び（1–5）。なければ一覧のみ |
| `url` | 本番の https URL。未確認は空文字 |
| `linkState` | `available`（開ける）/ `preparing`（紹介のみ） |
| `experienceNote` | CTA 横の注意（固定サンプル・認証など） |
| `can` / `planned` | 今できること / 今後追加すること |

体験リンクを足す例:

```js
url: 'https://example.vercel.app/',
linkState: 'available',
```

内部の改善優先度は [`docs/demo-improvements.md`](docs/demo-improvements.md)。

## URL パラメータ

| 例 | 意味 |
|---|---|
| `/?demo=construction-record` | その紹介を開く |
| `/?view=all` | 全件一覧 |
| `/?view=all&cat=factory` | 製造・設備で絞り込み |
| `/?view=all&q=シフト` | 検索 |

## デプロイ

Vercel（Vite / `dist`）。`main` への push で本番反映。
