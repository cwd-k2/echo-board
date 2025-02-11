# フロントエンド

## 構成

- Vue + Vue Router + Pinia

## ディレクトリ

- `lib/`
  - Vue / Vue Router / Pinia / ... に依存しない汎用ロジック
- `run/`
  - Vue のコンポーネントなどから呼ばれることを想定
  - Vue / Vue Router (?) / Pinia ... に依存するかも
