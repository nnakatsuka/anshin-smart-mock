# あんしん決済 Smart版｜画面イメージ（分割版）

元の単一HTML（`v61` / 5,514行・22画面）を **1画面 = 1ファイル** に分割したものです。
画面ごとにファイルが独立しているため、ある画面を編集しても他画面はデグりません。

## 構成

```
index.html              ← 画面一覧（ここから各画面へ遷移）
assets/
  common.css            ← 全画面共通のスタイル（元の <style> をそのまま抽出）
  common.js             ← 全画面共通のスクリプト（元の <script> を統合）
screens/
  login.html            ← ログイン画面
  s02.html              ← STEP① 成約情報登録（CL）
  s03.html              ← STEP② 成約情報確認（CS）
  s05.html              ← STEP③ 入金（CL）
  s09.html              ← STEP⑤ 受領連絡（CL）
  prop-list-new.html    ← 物件一覧（マトリクス型）
  prop-detail.html      ← 物件詳細（MOTA）
  prop-detail-cl.html   ← 物件詳細（CL）
  payment-mgmt.html     ← 入金／送金
  cl-basic-info.html    ← 基本情報（通知先＋入金方法）
  cs-settings.html      ← CS 各種設定
  …ほか全22画面
```

## GitHub での公開（GitHub Pages）

1. このフォルダ一式をリポジトリにそのままアップ（`index.html` がルート）。
2. リポジトリの **Settings → Pages** で、Branch を `main` / フォルダを `/ (root)` に設定。
3. 発行された URL を開くと `index.html` が表示され、各画面へ遷移して確認できます。

ローカル確認は `index.html` をブラウザで直接開くだけでも動きます。

## 編集ルール（デグレ防止）

- **1画面を直すときは `screens/<画面ID>.html` だけを編集**。他画面ファイルには触れない。
- 全画面に効く色・余白・共通パーツの変更だけ `assets/common.css`、共通の動き（タブ切替等）は `assets/common.js`。
- 画面間の遷移は `onclick="showScreen('画面ID')"` のまま使えます（`common.js` が `画面ID.html` への遷移に変換）。
- 画面を追加したら `screens/` にファイルを足し、`index.html` のナビにタブを1行追加。

## 元ファイルからの変更点

- 各画面を独立HTML化。画面本体のHTMLは**元のまま**（無改変）。
- `showScreen()` を「同一ページ内のタブ切替」→「別ファイルへの遷移」に変更（`common.js` 末尾で上書き）。
- 各画面ページ上部に「← 画面一覧へ戻る」バーを追加。

変更履歴（v54〜v61）は `index.html` の先頭コメントに保持しています。
