import type { Post } from '#/post';
import type { PostData } from '#/post-data';
import type { Row } from '#/row';
import type { Request } from '#/request';
import type { Response } from '#/response';
import type { User } from '#/user';

import { useDB } from '%/lib/db';

export default async function getPostList(
  _userId: string,
  request: Request<{ limit?: number; referencedAt?: Date }, {}>
): Promise<Response<Row<Post>[]>> {
  const db = useDB();

  const limit = request.query.limit ?? 10;
  const range = IDBKeyRange.upperBound(
    request.query.referencedAt ?? new Date()
  );

  const postList = await db.fetchRanged<Row<PostData>>('post-data', {
    index: 'createdAtIdx',
    range,
    limit,
    direction: 'prev',
  });

  if (postList === undefined) throw new Error('Failed to fetch post list');

  const userList = await Promise.all(
    postList
      .map((post) => post.userId)
      // unique
      .filter((userId, idx, arr) => arr.indexOf(userId) === idx)
      .map((userId) =>
        // N + 1 だが IDB でどうすればよいか知らない
        db.fetchSingle<Row<User>>('user', {
          index: 'idIdx',
          value: userId,
        })
      )
  ).then((users) => users.filter((user) => user !== undefined));

  return {
    status: 200,
    message: postList.map((post) => {
      const user = userList.find((user) => user.id === post.userId);
      if (user === undefined) throw new Error('Failed to fetch user');
      return {
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        content: post.content,
        user: {
          accountName: user.accountName,
          displayName: user.displayName,
          description: user.description,
        },
      };
    }),
  };
}
