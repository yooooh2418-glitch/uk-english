# Wordle — UK日英辞書 (PWA)

イギリス英語の日常会話に特化した日英相互辞書アプリ。
GitHub Pages で公開して、iPhone / Android のホーム画面に追加すればネイティブアプリのように動きます（オフライン対応）。

## 収録内容
- 単語 1,004語 ＋ 会話フレーズ 69（合計 1,073エントリ）
- UK発音カタカナ（重要語 102語）＋ タップで端末内蔵のイギリス英語音声を再生
- 双方向検索（日↔英）／23カテゴリ一覧／6シーン別パック
- クイズ（間隔反復・日→英4択）／熟練度トラッキング（localStorage保存）

## ファイル構成
```
.
├── index.html            ← アプリ本体
├── manifest.json         ← PWA設定（アプリ名・アイコン・色）
├── service-worker.js     ← オフラインキャッシュ
└── icons/                ← アイコン各種
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    ├── icon-maskable-512.png
    ├── apple-touch-icon.png
    └── favicon.png
```

## GitHub Pages での公開手順

1. **リポジトリを作る**
   GitHub で新規リポジトリ（例: `wordle-uk`）を作成。Public にする。

2. **ファイルをアップロード**
   このフォルダの中身（index.html, manifest.json, service-worker.js, icons/）を
   リポジトリの**ルート**にそのままアップロードする。
   （フォルダ構成を崩さないこと。icons/ はフォルダごと）

3. **Pages を有効化**
   リポジトリの `Settings` → `Pages` →
   `Source` を `Deploy from a branch` にし、`Branch` を `main` / `/(root)` に設定して保存。

4. **数分待つ**
   `https://<ユーザー名>.github.io/wordle-uk/` で公開される。

5. **iPhone でインストール**
   Safari で上記URLを開く → 共有ボタン → **「ホーム画面に追加」**。
   アイコンがホームに追加され、全画面アプリとして起動する。

> ⚠️ PWA（Service Worker）は **HTTPS でのみ動作**します。GitHub Pages は自動でHTTPSになるのでそのまま動きます。
> ローカルの `file://` で直接開くと Service Worker は動きません（アプリ自体は動きます）。

## 更新方法
内容を変えたら、`service-worker.js` の先頭 `const CACHE = 'wordle-uk-v1';` の
`v1` を `v2` などに上げてからアップロードすると、古いキャッシュが破棄され最新版に更新されます。

## カスタムドメインやサブパスについて
すべてのパスを相対指定（`./...`）にしてあるため、
`username.github.io/repo-name/` のようなサブパスでも、独自ドメインでもそのまま動きます。
