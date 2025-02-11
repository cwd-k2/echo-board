import type { Request } from '#/request';
import type { Response } from '#/response';
import type { Row } from '#/row';
import type { User } from '#/user';
import type { UserPassword } from '#/user-password';
import type { UserToken } from '#/user-token';

import { useDB } from '%/lib/db';
import { sha256, generateToken } from '%/lib/auth';

export default async function authLogin(
  request: Request<{}, { accountName: string; password: string }>
): Promise<Response<UserToken>> {
  const db = useDB();

  const user = await db.fetchSingle<Row<User>>('user', {
    index: 'accountNameIdx',
    value: request.body.accountName,
  });

  if (user === undefined)
    return {
      status: 400,
      message: 'User not found',
    };

  const userPassword = await db.fetchSingle<Row<UserPassword>>(
    'user-password',
    {
      index: 'userIdIdx',
      value: user.id,
    }
  );

  if (userPassword?.password !== (await sha256(request.body.password)))
    return {
      status: 401,
      message: 'Bad password',
    };

  return {
    status: 200,
    message: {
      token: await generateToken(user.id),
      user,
    },
  };
}
