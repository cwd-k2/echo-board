import type { User } from '#/user';
import type { Row } from '#/row';
import type { Request } from '#/request';
import type { Response } from '#/response';

import { useDB } from '%/lib/db';

export default async function getUser(
  request: Request<{ id: string }, {}>
): Promise<Response<Row<User>>> {
  const db = useDB();

  const userRow = await db.fetchSingle<Row<User>>('user', {
    index: 'idIdx',
    value: request.query.id,
  });

  if (userRow === undefined)
    return {
      status: 400,
      message: 'Bad user id',
    };

  return {
    status: 200,
    message: userRow,
  };
}
