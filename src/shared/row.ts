// DB で自動的に付与したりしなかったり
export type Row<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
