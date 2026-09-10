# ideal_pf

ideal合同会社の公開デモ紹介ページ（Vite 静的ホスト）。

見た目と操作は元の HTML プロトタイプのままです。外部デモの URL は後から `src/data.js` の `url` に入れます。今は空なので、詳細画面の「デモを開く」は無効表示になります。

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

## 外部 URL の入れ方

`src/data.js` の各デモの `url` を公開先に差し替えるだけです。

```js
url: 'https://example.vercel.app/',
```

空のままだと詳細の CTA は押せません。

## デプロイ

Vercel（Framework Preset: Vite、Output: `dist`）。GitHub の `main` に push すると本番へ出ます。
