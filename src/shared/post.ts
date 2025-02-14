import type { Row } from '#/row';
import type { User } from '#/user';

export type Post = {
  user: Row<User>; // 作成者
  content: string; // 内容
};
