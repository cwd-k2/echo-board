import type { Row } from '#/row';
import type { User } from '#/user';

export type UserToken = {
  token: string;
  user: Row<User>;
};
