export type DBConfig = {
  table: string; // object store の名前
  index: { name: string; prop: string; opt?: any }[]; // インデックス設定
};
