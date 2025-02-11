import type { Request } from '#/request';
import type { Response } from '#/response';
import type { Row } from '#/row';
import type { User } from '#/user';
import type { UserPassword } from '#/user-password';
import type { UserToken } from '#/user-token';

import { useDB } from '%/lib/db';
import { sha256, generateToken } from '%/lib/auth';

export default async function autoRegister(
  request: Request<{}, { accountName: string; password: string }>
): Promise<Response<UserToken>> {
  const db = useDB();

  const user = await db.fetchSingle<Row<User>>('user', {
    index: 'accountNameIdx',
    value: request.body.accountName,
  });

  if (user !== undefined)
    return {
      status: 400,
      message: 'Account name is already taken',
    };

  const newId = await db.add<User>('user', {
    displayName: '',
    accountName: request.body.accountName,
    description: '',
  });

  await db.add<UserPassword>('user-password', {
    userId: newId,
    password: await sha256(request.body.password),
  });

  const newUser = await db.fetchSingle<Row<User>>('user', {
    index: 'idIdx',
    value: newId,
  });

  if (newUser === undefined) {
    throw new Error('Failed to retrieve user');
  }

  return {
    status: 200,
    message: {
      token: await generateToken(newUser),
      user: newUser,
    },
  };
}
