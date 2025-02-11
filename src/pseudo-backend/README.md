# 擬似バックエンド

## 構成

- DB
  - IndexedDB
- ハンドラ
  - `Request<Q, T>` を受けとって `Response<R>` を返す関数
  - `User, Request<Q, T>` を受けとって `Response<R>` を返す関数
    - こちらは認証を要求する
