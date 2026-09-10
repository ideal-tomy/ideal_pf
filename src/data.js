/** 公開デモ紹介データ。URL は確認済み本番のみ。未確認は空＋preparing。 */

export const ICON = {
  camera:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><path d="M4 12l5 5L20 6"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><path d="M6 4h9l4 4v12H6z"/><path d="M9 12h7M9 16h5"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/></svg>',
  bldg:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><path d="M4 20h16"/><path d="M6 20V9l6-4 6 4v11"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><path d="M4 6h16v10H8l-4 4V6z"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
}

export const SCR = {
  photos:'<div class="bar"><b></b><u></u></div><div class="grid"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="btn"></div>',
  check:'<div class="bar"><b></b><u></u></div><div class="chk done"><s></s><em></em></div><div class="chk done"><s></s><em></em></div><div class="chk"><s></s><em></em></div><div class="chk"><s></s><em></em></div><div class="btn"></div>',
  list:'<div class="bar"><b></b><u></u></div><div class="row"><s></s><em></em><em></em></div><div class="row"><s></s><em></em><em></em></div><div class="row"><s></s><em></em><em></em></div><div class="btn"></div>',
  form:'<div class="bar"><b></b><u></u></div><div class="fld sm"></div><div class="fld"></div><div class="fld sm"></div><div class="fld"></div><div class="btn"></div>',
  card:'<div class="bar"><b></b><u></u></div><div class="row"><s></s><em></em><em></em></div><div class="grid"><i></i><i></i><i></i></div><div class="btn"></div>'
}

/** 業種タブ用（主カテゴリ）。id はフィルタ値。tile は上タイルとの対応。 */
export const CATEGORIES = [
  { id:'construction', label:'建設・現場', tile:'construction', desc:'写真・報告書・手配', bg:'#8b2088' },
  { id:'factory', label:'製造・設備', tile:'factory', desc:'点検・検査・品質', bg:'#4b2a94' },
  { id:'care', label:'医療・介護・保育・薬局', tile:'care', desc:'記録・引き継ぎ', bg:'#c31f5c' },
  { id:'gov', label:'自治体・地域', tile:'gov', desc:'施設・防災', bg:'#1c6270' },
  { id:'food', label:'飲食・食品', tile:null, desc:'シフト・仕込み', bg:'#c45a2a' },
  { id:'talent', label:'人材・士業', tile:null, desc:'派遣・紹介・SFA', bg:'#2b3fa0' },
  { id:'realestate', label:'不動産', tile:null, desc:'物件マッチング', bg:'#3a5f4a' },
  { id:'cross-industry', label:'業種を選ばない', tile:null, desc:'受付・ナレッジ・投稿', bg:'#5b34c4' }
]

/**
 * listed 全件が掲載対象。
 * featuredOrder があるものがトップの sticky カード。
 * linkState: available | preparing
 * category: CATEGORIES.id / tile: 上タイル用キー（null可）
 */
export const DEMOS = [
  {
    id:'construction-record', listed:true, featuredOrder:1,
    category:'construction', tile:'construction', tags:['建設','写真','報告書'],
    cls:'c1', icon:'camera',
    title:'現場の写真から<br>報告書をつくる',
    plain:'現場の写真から報告書をつくる',
    lead:'撮る→整える→日報・報告書。写真分類と報告書下書きをまとめて体験できます。',
    one:'現場写真から日報・報告書の流れを、3つの体験で見られます。',
    audience:'現場と事務',
    url:'https://construction-demo-six.vercel.app/',
    linkState:'available',
    experienceNote:'サンプル体験です。実画像のAI解析は回数・費用の上限があります。',
    when:'現場で撮った写真を、事務所で報告書に貼り直している会社を想定しています。写真の整理から下書きまでを画面で追えます。',
    can:['写真分類・報告書・現場オペの入口から体験を選べます','写真を選んで工種・場所を付けられます','報告書の下書きまで進めます'],
    planned:['公開時の利用回数・費用上限の明示'],
    shots:[['photos','写真を選ぶ'],['list','整える'],['form','報告書']],
    relatedIds:['field-dandori','contractor-matching','approval-inspection']
  },
  {
    id:'customer-support', listed:true, featuredOrder:2,
    category:'cross-industry', tile:null, tags:['サポート','小売','問い合わせ'],
    cls:'c3', icon:'chat',
    title:'業種別の案内<br>チャットを試す',
    plain:'業種別の案内チャットを試す',
    lead:'定型の問い合わせに、根拠付きの案内を返す流れを体験できます。',
    one:'業種を選んで、サポート案内の応答を試せます。',
    audience:'店舗とサポート担当',
    url:'https://customer-support-demo-lime.vercel.app/',
    linkState:'available',
    experienceNote:'キー不要の固定回答と、実AI接続のモードがあります。入口で違いを確認してください。',
    when:'よくある問い合わせを、毎回同じ説明で返している店舗や窓口を想定しています。',
    can:['業種カードから体験を始められます','根拠付きの案内応答を確認できます','サンプル応答と実AIの切り替えを見られます'],
    planned:['業種カードのキーボード操作の仕上げ'],
    shots:[['card','業種を選ぶ'],['list','質問する'],['form','案内が返る']],
    relatedIds:['assist-reception','internal-knowledge','sns-post']
  },
  {
    id:'shift', listed:true, featuredOrder:3,
    category:'food', tile:null, tags:['飲食','シフト','割当'],
    cls:'c4', icon:'cal',
    title:'希望から<br>シフト案をつくる',
    plain:'希望からシフト案をつくる',
    lead:'希望→割当案→確定→欠勤対応までの流れを、ルール割当のデモとして体験できます。',
    one:'飲食店のシフトを、希望から案まで組み立てる体験です。',
    audience:'店長とスタッフ',
    url:'https://shift-demo-ten.vercel.app/',
    linkState:'available',
    experienceNote:'ルールによる割当デモです。AI自動最適化ではありません。',
    when:'紙や表計算でシフトを組み、欠勤のたびに組み直している店舗を想定しています。',
    can:['希望の入力から割当案を作れます','確定と欠勤対応の流れを追えます','スマホでも主要操作を触れます'],
    planned:['関連する試算リンクの不備確認'],
    shots:[['list','希望を入れる'],['check','案を見る'],['form','確定する']],
    relatedIds:['expense-optimize','customer-support','assist-reception']
  },
  {
    id:'quality-incident', listed:true, featuredOrder:4,
    category:'factory', tile:'factory', tags:['製造','品質','是正'],
    cls:'c2', icon:'gear',
    title:'品質インシデントを<br>画面で追う',
    plain:'品質インシデントを画面で追う',
    lead:'発見→原因候補→是正・承認まで、架空データで画面構成を確認できます。',
    one:'品質トラブルの対応フローを、コンソール画面で追えます。',
    audience:'品質と製造の担当',
    url:'https://axeonmanufacturing02.vercel.app/',
    linkState:'available',
    experienceNote:'ナビ名と画面の対応にずれがあります。シナリオ内の操作と、まだ動かない保存・提出は区別して見てください。',
    when:'品質トラブルの記録が紙やメールに散らばり、是正まで見えにくい工場を想定しています。',
    can:['発見から是正・承認までの画面を辿れます','原因候補と架空データを確認できます','コンソール上の状態表示を見られます'],
    planned:['ナビと画面対応の修正','PDF保存・提出の実動作'],
    shots:[['list','発見'],['card','原因候補'],['form','是正・承認']],
    relatedIds:['manufacturing-compare','cause-demo','approval-inspection']
  },
  {
    id:'kaigo-handoff', listed:true, featuredOrder:5,
    category:'care', tile:'care', tags:['介護','申し送り','面談','日報'],
    cls:'c4', icon:'user',
    title:'申し送り・面談・<br>日報をまとめる',
    plain:'申し送り・面談・日報をまとめる',
    lead:'時刻ごとのメモをまとめ、確認して記録する体験です。面談・日報・一覧もあります。',
    one:'介護施設の申し送り・面談・日報を、同じ流れで触れます。',
    audience:'介護職員と管理者',
    url:'https://kaigo-handoff-demo.vercel.app/',
    linkState:'available',
    experienceNote:'録音や固定入力の範囲、保存期限、架空データがあります。入口の説明を読んでから進めてください。',
    when:'申し送りを紙や口頭だけに頼り、後から書き直している事業所を想定しています。',
    can:['申し送りメモの整理と確認ができます','面談・日報の画面に進めます','記録一覧への反映を確認できます'],
    planned:['要確認項目→提出→一覧の実画面検証'],
    shots:[['form','メモを入れる'],['list','確認する'],['card','一覧で見る']],
    relatedIds:['voice-karte-simple','kaigo-3role','childcare']
  },
  {
    id:'manufacturing-compare', listed:true,
    category:'factory', tile:'factory', tags:['製造','判断','比較'],
    cls:'c2', icon:'list',
    title:'現場情報から<br>対応案を比較する',
    plain:'現場情報から対応案を比較する',
    lead:'5つのシーンで、2案の結果比較とリセットまで体験できます。',
    one:'製造現場の情報から、対応案を並べて比べる体験です。',
    audience:'製造の現場と管理者',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。ローカルでは手動体験まで確認済みです。',
    when:'現場の判断材料が口頭や紙に散らばり、案の比較が難しい製造現場を想定しています。',
    can:['シーンを選んで対応案を比較できます','2案の結果とリセットを確認できます'],
    planned:['本番URLの用意と最終動作確認'],
    shots:[['list','シーンを選ぶ'],['card','案を比べる'],['form','結果を見る']],
    relatedIds:['quality-incident','product-flow-mfg','cause-demo']
  },
  {
    id:'internal-knowledge', listed:true,
    category:'cross-industry', tile:null, tags:['ナレッジ','社内','規程'],
    cls:'c3', icon:'search',
    title:'規程・マニュアルに<br>聞いてみる',
    plain:'規程・マニュアルに聞いてみる',
    lead:'社内資料への質問に、回答と根拠をセットで返す流れを体験できます。',
    one:'社内ナレッジへの質問と、根拠付き回答を試せます。',
    audience:'総務と現場の利用者',
    url:'https://internal-knowledge-demo.vercel.app/',
    linkState:'available',
    experienceNote:'Sample / BYOK / Trial のモードがあります。最初のガイド質問が空振りする場合があります。',
    when:'規程やマニュアルを探すのに時間がかかり、根拠が残らない社内問い合わせを想定しています。',
    can:['資料への質問と根拠付き回答を試せます','資料投入の流れを確認できます','接続モードの違いを選べます'],
    planned:['最初のガイド質問から確実に回答へ到達する改善'],
    shots:[['form','質問する'],['list','根拠を見る'],['card','資料を入れる']],
    relatedIds:['product-flow-mfg','customer-support','assist-reception']
  },
  {
    id:'product-flow-mfg', listed:true,
    category:'factory', tile:'factory', tags:['製造','ナレッジ','判断'],
    cls:'c2', icon:'search',
    title:'製造の判断を<br>ナレッジで支える',
    plain:'製造の判断をナレッジで支える',
    lead:'業界パックとキー不要の質問導線で、製造の判断支援を体験できます。',
    one:'製造向けのナレッジ・判断支援デモです。',
    audience:'製造の現場と技術者',
    url:'https://product-flow-jet.vercel.app/manufacturing',
    linkState:'available',
    experienceNote:'キー不要のサンプル導線があります。ブランド表記は調整中です。',
    when:'手順や判断基準が属人化し、同じ問いを何度も聞き直している製造現場を想定しています。',
    can:['製造向けの質問導線を進められます','サンプルで回答まで到達できます'],
    planned:['タイトルと回答後の導線の整理'],
    shots:[['form','質問する'],['list','回答を見る'],['card','次の判断']],
    relatedIds:['internal-knowledge','manufacturing-compare','quality-incident']
  },
  {
    id:'contractor-matching', listed:true,
    category:'construction', tile:'construction', tags:['建設','協力業者','選定'],
    cls:'c1', icon:'user',
    title:'協力業者の選定を<br>支援する',
    plain:'協力業者の選定を支援する',
    lead:'スコア・マッチング・ルール応答で、業者選定の支援画面を体験できます。',
    one:'建設の協力業者選定を、ルール付きのデモで触れます。',
    audience:'元請と手配担当',
    url:'https://hookapp-demo.vercel.app/',
    linkState:'available',
    experienceNote:'架空データです。AI自動判断ではなく、選定支援のルールデモです。',
    when:'協力業者の候補が口コミと表に散らばり、条件比較がしづらい手配業務を想定しています。',
    can:['スコアとマッチングの画面を確認できます','ルール応答の流れを試せます'],
    planned:['3機能の完走とスマホ確認'],
    shots:[['list','候補を見る'],['card','スコア'],['form','応答']],
    relatedIds:['construction-record','field-dandori','approval-inspection']
  },
  {
    id:'assist-reception', listed:true,
    category:'cross-industry', tile:null, tags:['受付','整理','管理'],
    cls:'c3', icon:'chat',
    title:'5業種の受付を<br>画面で整理する',
    plain:'5業種の受付を画面で整理する',
    lead:'受付入力→整理プレビュー→管理一覧→ステータス変更の流れを想定したデモです。',
    one:'業種別の受付入力と、管理側の一覧を体験する予定です。',
    audience:'受付と管理者',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。固定ロジックの整理デモです。',
    when:'電話や紙の受付メモが散らばり、ステータスが見えない窓口を想定しています。',
    can:['受付から一覧までの画面構成を確認できます','ステータス変更の流れを想定できます'],
    planned:['デプロイとスマホ完走の確認'],
    shots:[['form','受付する'],['list','整理する'],['card','管理一覧']],
    relatedIds:['customer-support','internal-knowledge','sfa-legal']
  },
  {
    id:'approval-inspection', listed:true,
    category:'factory', tile:'factory', tags:['製造','受入検査','承認'],
    cls:'c2', icon:'check',
    title:'受入検査の照合と<br>承認を見る',
    plain:'受入検査の照合と承認を見る',
    lead:'図面と証明書の照合、保留、承認の画面構成を確認できます。',
    one:'受入検査の照合・保留・承認の画面を追えます。',
    audience:'検査と品質の担当',
    url:'https://approval-diagram.vercel.app/',
    linkState:'available',
    experienceNote:'確認記録・割当・履歴出力など、まだ動かない操作があります。画面紹介としてご覧ください。',
    when:'受入検査の照合と承認が紙と口頭に分かれ、保留の理由が残らない現場を想定しています。',
    can:['照合・保留・承認の画面を辿れます','基準改定の提示を確認できます'],
    planned:['無効ボタンの実装または画面紹介としての明示'],
    shots:[['list','照合'],['check','保留・承認'],['form','基準']],
    relatedIds:['quality-incident','inspection-record','construction-record']
  },
  {
    id:'inspection-record', listed:true,
    category:'factory', tile:'factory', tags:['製造','点検','記録'],
    cls:'c2', icon:'check',
    title:'設備の点検を<br>記録に残す',
    plain:'設備の点検を記録に残す',
    lead:'点検入力→確認→記録表示→印刷までの単一画面デモです。',
    one:'紙の点検表を、画面上の記録に置き換える体験です。',
    audience:'保全と管理者',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。記録はリロードで消える想定です。',
    when:'点検表を紙で回し、あとからファイルに綴じている工場を想定しています。',
    can:['点検項目の入力と確認ができます','記録表示と印刷の流れを追えます'],
    planned:['正常・異常の完走確認と公開URL'],
    shots:[['list','設備を選ぶ'],['check','項目を押す'],['form','記録になる']],
    relatedIds:['approval-inspection','quality-incident','disaster-facility']
  },
  {
    id:'shikomi-record', listed:true,
    category:'food', tile:null, tags:['食品','仕込み','知見'],
    cls:'c5', icon:'doc',
    title:'仕込みの記録と<br>知見をつなぐ',
    plain:'仕込みの記録と知見をつなぐ',
    lead:'仕込み状況・記録・類似知見の画面で、つけもの手帳の流れを体験できます。',
    one:'漬物工場の仕込み記録と知見継承のデモです。',
    audience:'製造と継承担当',
    url:'https://shikomi-record-demo.vercel.app/',
    linkState:'available',
    experienceNote:'録音は固定内容へ進む演出です。実音声認識・実AIではありません。',
    when:'仕込みの勘どころが人に留まり、記録と知見がつながらない食品工場を想定しています。',
    can:['仕込み状況と記録画面を確認できます','類似知見の提示を見られます'],
    planned:['記録追加・取り消し・再開の完走確認'],
    shots:[['list','状況を見る'],['form','記録する'],['card','知見']],
    relatedIds:['shift','expense-optimize','product-flow-mfg']
  },
  {
    id:'childcare', listed:true,
    category:'care', tile:'care', tags:['保育','記録','連絡'],
    cls:'c4', icon:'doc',
    title:'保育の記録と<br>連絡を整える',
    plain:'保育の記録と連絡を整える',
    lead:'園児の記録作成→確認→帳票までの流れを、入口とダッシュボードで体験できます。',
    one:'保育施設向けの記録・連絡デモです。',
    audience:'保育士と園の管理者',
    url:'https://ideal-tomy.github.io/childcare_demo/',
    linkState:'available',
    experienceNote:'録音演出・固定シナリオがあります。入口の説明を読んでから進めてください。',
    when:'保育の記録と保護者連絡が紙と口頭に分かれ、確認に時間がかかる園を想定しています。',
    can:['記録作成から確認までの流れを追えます','帳票まわりの画面を確認できます'],
    planned:['スマホでの完走確認'],
    shots:[['form','記録する'],['list','確認する'],['card','帳票']],
    relatedIds:['kaigo-handoff','voice-karte-simple','kaigo-3role']
  },
  {
    id:'disaster-facility', listed:true,
    category:'gov', tile:'gov', tags:['自治体','防災','施設'],
    cls:'c5', icon:'bldg',
    title:'防災施設の状態を<br>まとめて見る',
    plain:'防災施設の状態をまとめて見る',
    lead:'施設・インシデント・根拠資料など、自治体の防災施設管理コンソールを体験できます。',
    one:'自治体向けの防災施設管理デモです。',
    audience:'施設の担当課',
    url:'https://disaster-prevention-demo.vercel.app/',
    linkState:'available',
    experienceNote:'架空市のデータです。実際の開設判断ではありません。',
    when:'施設情報と点検・判断が課ごとに分かれ、災害時に揃えづらい自治体を想定しています。',
    can:['施設とインシデントの画面を確認できます','判断と根拠資料の流れを追えます'],
    planned:['判断後の一覧・履歴反映の完走確認'],
    shots:[['list','施設を選ぶ'],['card','状態を見る'],['form','判断する']],
    relatedIds:['gym-facility','inspection-record','chiiki-bunka']
  },
  {
    id:'gym-facility', listed:true,
    category:'gov', tile:'gov', tags:['指定管理','体育館','施設'],
    cls:'c5', icon:'bldg',
    title:'総合体育館の<br>施設管理を見る',
    plain:'総合体育館の施設管理を見る',
    lead:'指定管理者向けの単一体育館デモです。自治体版とは別の体験です。',
    one:'総合体育館の施設管理コンソールを触れます。',
    audience:'指定管理者と施設担当',
    url:'https://disaster-prevention-demo02.vercel.app/',
    linkState:'available',
    experienceNote:'判断訂正・保存範囲・履歴の一致など、確認中の点があります。',
    when:'単一施設の状態と履歴が散らばり、判断の根拠が残りにくい指定管理を想定しています。',
    can:['体育館向けの施設管理画面を確認できます','判断と結果の流れを追えます'],
    planned:['判断訂正と保存範囲の整合確認'],
    shots:[['list','施設'],['card','カルテ'],['form','判断']],
    relatedIds:['disaster-facility','inspection-record','chiiki-bunka']
  },
  {
    id:'voice-karte-simple', listed:true,
    category:'care', tile:'care', tags:['介護','申し送り','短い体験'],
    cls:'c4', icon:'user',
    title:'短い申し送りを<br>体験する',
    plain:'短い申し送りを体験する',
    lead:'申し送りメモをまとめる、短い単体体験です。面談・日報付きの版とは別です。',
    one:'申し送りの短い画面体験です。',
    audience:'介護職員',
    url:'https://lambent-smakager-7bcf0a.netlify.app/',
    linkState:'available',
    experienceNote:'自動再生や演出があります。録音と固定入力の違いに注意してください。',
    when:'申し送りを短時間で試し、画面の雰囲気だけ先に見たい場面を想定しています。',
    can:['短い申し送りの流れを確認できます','自動再生版の画面を見られます'],
    planned:['現行の介護申し送りとの役割分担の明示'],
    shots:[['form','メモ'],['list','整理'],['card','結果']],
    relatedIds:['kaigo-handoff','kaigo-3role','childcare']
  },
  {
    id:'cause-demo', listed:true,
    category:'factory', tile:'factory', tags:['製造','原因','説明'],
    cls:'c2', icon:'search',
    title:'製造の原因特定を<br>説明する',
    plain:'製造の原因特定を説明する',
    lead:'画像入りの説明デモです。操作アプリというより、ストーリー紹介に近い体験です。',
    one:'原因特定の流れを、画面ストーリーで追います。',
    audience:'製造の品質担当',
    url:'https://cause-demo.vercel.app/',
    linkState:'available',
    experienceNote:'操作は主に「次へ」の説明デモです。掲載の画面と数値は例です。',
    when:'原因分析の手順を社内で共有しづらい製造現場を想定しています。',
    can:['原因特定のストーリー画面を確認できます','記録を同じ時間軸で揃える考え方を追えます'],
    planned:['モバイルでの読みやすさの仕上げ'],
    shots:[['card','状況'],['list','原因'],['form','説明']],
    relatedIds:['quality-incident','manufacturing-compare','product-flow-mfg']
  },
  {
    id:'field-dandori', listed:true,
    category:'construction', tile:'construction', tags:['電気工事','段取り','現場'],
    cls:'c1', icon:'list',
    title:'現場の段取り案を<br>組み立てる',
    plain:'現場の段取り案を組み立てる',
    lead:'入力から計画・出力まで、電気工事の段取り生成を想定したデモです。',
    one:'電気工事の現場段取りを、画面上で組み立てる体験です。',
    audience:'現場監督と手配担当',
    url:'https://rainbow-tarsier-5ce845.netlify.app/',
    linkState:'available',
    experienceNote:'サンプル現場のデモです。所轄・期限・人員などは説明用の値です。',
    when:'段取りが個人の経験に依存し、変更のたびに手戻りが大きい現場を想定しています。',
    can:['現場を選んで段取り案を確認できます','申請・人員・書類の組み立てを追えます'],
    planned:['独自ドメインへの整理'],
    shots:[['form','条件を入れる'],['list','計画'],['card','出力']],
    relatedIds:['construction-record','contractor-matching','expense-optimize']
  },
  {
    id:'expense-optimize', listed:true,
    category:'cross-industry', tile:null, tags:['経費','建設','製造','飲食'],
    cls:'c3', icon:'doc',
    title:'経費の見直しを<br>業種別に試す',
    plain:'経費の見直しを業種別に試す',
    lead:'建設・製造・飲食の3シナリオで、経費最適化の画面を想定したデモです。',
    one:'3業種の経費見直しシナリオを紹介します。',
    audience:'経理と現場管理者',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。架空データです。',
    when:'経費の見直しが表計算に散らばり、業種ごとの観点が見えにくい会社を想定しています。',
    can:['業種別シナリオの構成を確認できます','CSV読込・分析の流れを想定できます'],
    planned:['代表入口の統合と公開'],
    shots:[['list','業種を選ぶ'],['form','データを入れる'],['card','結果']],
    relatedIds:['shift','construction-record','manufacturing-compare']
  },
  {
    id:'pharmacy-transfer', listed:true,
    category:'care', tile:'care', tags:['薬局','在庫','融通'],
    cls:'c4', icon:'doc',
    title:'薬局間の在庫を<br>融通する',
    plain:'薬局間の在庫を融通する',
    lead:'在庫・依頼・受渡し・結果まで、薬局版の融通シナリオを想定したデモです。',
    one:'薬局どうしの在庫融通の流れを紹介します。',
    audience:'薬局の薬剤師と管理者',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。実装済みシナリオだけを紹介します。',
    when:'近隣薬局との在庫融通が電話と紙に頼り、結果が残りにくい場面を想定しています。',
    can:['在庫依頼から受渡しまでの流れを想定できます'],
    planned:['代表入口の用意と完走確認'],
    shots:[['list','在庫'],['form','依頼'],['card','結果']],
    relatedIds:['childcare','kaigo-handoff','assist-reception']
  },
  {
    id:'chiiki-bunka', listed:true,
    category:'gov', tile:'gov', tags:['地域','観光','移住'],
    cls:'c5', icon:'bldg',
    title:'地域の文化・観光を<br>提案する',
    plain:'地域の文化・観光を提案する',
    lead:'観光・移住・移動などの地域シナリオを、代表1本に絞って紹介する予定です。',
    one:'地域の語りを旅と経済につなぐ、5画面のデモです。',
    audience:'自治体と地域事業者',
    url:'https://chiiki-demo-site.vercel.app/',
    linkState:'available',
    experienceNote:'人名や金額は架空です。実際の予約・決済・送金は行われません。',
    when:'地域の魅力が資料に散らばり、来訪者への提案が属人化している場面を想定しています。',
    can:['語りの記録から旅案内までの流れを追えます','運営・マーケットの画面を確認できます'],
    planned:['代表シナリオのさらなる絞り込み'],
    shots:[['card','地域'],['list','提案'],['form','詳細']],
    relatedIds:['disaster-facility','gym-facility','property-match']
  },
  {
    id:'haken-dash', listed:true,
    category:'talent', tile:null, tags:['人材','派遣','営業'],
    cls:'c3', icon:'user',
    title:'派遣の営業状況を<br>一覧で見る',
    plain:'派遣の営業状況を一覧で見る',
    lead:'候補者・企業・案件・収益を、架空データで扱う派遣コックピットです。',
    one:'派遣営業向けの一覧・案件デモです。',
    audience:'派遣の営業担当',
    url:'https://haken-dash.vercel.app/',
    linkState:'available',
    experienceNote:'架空データです。短いマッチング体験の整備は今後です。',
    when:'候補と案件の状況が表に散らばり、営業の次手が見えにくい派遣会社を想定しています。',
    can:['候補・企業・案件の画面を確認できます','収益まわりの表示を見られます'],
    planned:['マッチング→詳細→更新の短い体験'],
    shots:[['list','案件'],['card','候補'],['form','更新']],
    relatedIds:['vietnam-haken','sfa-legal','contractor-matching']
  },
  {
    id:'sfa-legal', listed:true,
    category:'talent', tile:null, tags:['士業','SFA','相談'],
    cls:'c3', icon:'doc',
    title:'士業の相談案件を<br>進める',
    plain:'士業の相談案件を進める',
    lead:'案件・顧客・ステージ変更まで、士業向けミニSFAを体験できます。',
    one:'士業の相談受付から次アクションまでのデモです。',
    audience:'士業事務所の担当',
    url:'https://sfa-legal.vercel.app/',
    linkState:'available',
    experienceNote:'架空データです。未実装の外部連携があります。',
    when:'相談の受付と受任判断がメモに散らばり、次アクションが見えない事務所を想定しています。',
    can:['相談からステージ変更までの流れを追えます','顧客・案件の画面を確認できます'],
    planned:['保存と初期化、モバイル確認'],
    shots:[['form','受付'],['list','判断'],['card','次アクション']],
    relatedIds:['haken-dash','assist-reception','vietnam-haken']
  },
  {
    id:'vietnam-haken', listed:true,
    category:'talent', tile:null, tags:['人材紹介','選考','マッチング'],
    cls:'c3', icon:'user',
    title:'人材紹介の選考を<br>進める',
    plain:'人材紹介の選考を進める',
    lead:'応募者・企業・スコア・選考カンバンで、紹介業務の流れを体験できます。',
    one:'人材紹介のマッチングと選考管理デモです。',
    audience:'人材紹介のコーディネーター',
    url:'https://vietnam-demo-zeta.vercel.app/',
    linkState:'available',
    experienceNote:'架空データです。リロードで初期化されます。',
    when:'応募者と企業の進捗が表に分かれ、選考状況が見えにくい紹介会社を想定しています。',
    can:['追加→マッチング→進捗更新の流れを追えます','スコアとカンバンを確認できます'],
    planned:['READMEへの本番URL反映'],
    shots:[['list','候補'],['card','マッチ'],['form','進捗']],
    relatedIds:['haken-dash','sfa-legal','property-match']
  },
  {
    id:'property-match', listed:true,
    category:'realestate', tile:null, tags:['不動産','マッチング','条件'],
    cls:'c5', icon:'bldg',
    title:'条件から物件を<br>順位付けする',
    plain:'条件から物件を順位付けする',
    lead:'条件入力・重み付き順位・理由表示で、物件マッチングの画面を想定したデモです。',
    one:'希望条件から物件を並べるマッチングデモです。',
    audience:'不動産の営業担当',
    url:'',
    linkState:'preparing',
    experienceNote:'公開URLを準備しています。架空物件です。',
    when:'条件と物件の対応が属人化し、提案理由が残りにくい不動産営業を想定しています。',
    can:['条件入力と順位表示の構成を確認できます','提案理由の表示を想定できます'],
    planned:['公開とスマホ確認'],
    shots:[['form','条件'],['list','順位'],['card','理由']],
    relatedIds:['vietnam-haken','chiiki-bunka','contractor-matching']
  },
  {
    id:'sns-post', listed:true,
    category:'cross-industry', tile:null, tags:['SNS','投稿','生成'],
    cls:'c3', icon:'chat',
    title:'投稿文の下書きを<br>つくる',
    plain:'投稿文の下書きをつくる',
    lead:'画像と説明からSNS投稿文を生成するUIです。一般公開前の調整があります。',
    one:'Instagram向け投稿文の生成デモです。',
    audience:'店舗の広報担当',
    url:'',
    linkState:'preparing',
    experienceNote:'APIキー前提の部分があります。固定サンプルを整えてから一般公開します。',
    when:'店舗のSNS投稿を毎回ゼロから書いており、下書きに時間がかかる場面を想定しています。',
    can:['画像と説明から投稿文を作る画面構成を確認できます'],
    planned:['キー不要サンプルと失敗時表示の整備'],
    shots:[['form','素材'],['card','下書き'],['list','候補']],
    relatedIds:['customer-support','shift','assist-reception']
  },
  {
    id:'kaigo-3role', listed:true,
    category:'care', tile:'care', tags:['介護','3ロール','記録'],
    cls:'c4', icon:'user',
    title:'現場・内勤・医療の<br>3ロールで見る',
    plain:'現場・内勤・医療の3ロールで見る',
    lead:'現場・内勤・医療連携の役割で、ケア記録の流れを体験するデモです。短い申し送り版・面談日報版とは別です。',
    one:'ケア記録を3つの役割から見るデモです。',
    audience:'介護の現場・内勤・医療連携',
    url:'https://kaigo-operation-demo.vercel.app/',
    linkState:'available',
    experienceNote:'現場・内勤・医療連携の3ロール体験です。短い申し送り版・面談日報版とは別です。',
    when:'現場・内勤・医療で見る情報が分かれ、申し送りがつながらない事業所を想定しています。',
    can:['3ロールの画面構成を確認できます','記録の流れを役割ごとに追えます'],
    planned:['体験後の相談導線の整理'],
    shots:[['list','現場'],['form','内勤'],['card','医療連携']],
    relatedIds:['kaigo-handoff','voice-karte-simple','childcare']
  }
]

export function listedDemos() {
  return DEMOS.filter(function (d) { return d.listed !== false })
}

export function featuredDemos() {
  return listedDemos()
    .filter(function (d) { return d.featuredOrder != null })
    .sort(function (a, b) { return a.featuredOrder - b.featuredOrder })
}

export function getDemoById(id) {
  return DEMOS.find(function (d) { return d.id === id }) || null
}

export function countListed() {
  return listedDemos().length
}

export function countAvailableLinks() {
  return listedDemos().filter(function (d) {
    return d.linkState === 'available' && d.url && /^https:\/\//.test(d.url)
  }).length
}

export function countByCategory(categoryId) {
  return listedDemos().filter(function (d) { return d.category === categoryId }).length
}

export function countByTile(tileId) {
  return listedDemos().filter(function (d) { return d.tile === tileId }).length
}

export function categoryLabel(id) {
  var c = CATEGORIES.find(function (x) { return x.id === id })
  return c ? c.label : id
}
