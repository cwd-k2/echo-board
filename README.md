# echo board

## これは何

フロントエンド＋擬似バックエンドの構成の SNS 風 Web アプリケーション

名前は ChatGPT に付けてもらった

拡張することで，プログラミング始めてとかの人でも開発の流れを体験できると思う (多分)

## 起動

```sh
$ npm install
$ npm run dev
# localhost:5173 にアクセスして HMR 見ながら開発できる
```

## 構成

### フロントエンド

- Vue3
  - 部分的に React (Boring Avatar を利用するため)
- Vue Router
- Pinia
- 擬似 fetch

### 擬似バックエンド

- Web Worker 上で動作
  - 擬似 fetch で Worker を呼び出し，fetch はそこに postMessage するだけ
- IndexedDB を DB 代わりに利用
  - 開発者ツールの Application タブで確認できるはず
  - 何か設定を変えたら一度リセットするのが楽
- ブラウザ上で動作するため，データ永続はするが他のクライアントとの環境同期はない
