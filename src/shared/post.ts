import type { User } from '#/user';

export type Post = {
  user: User; // 作成者
  content: string; // 内容
};
