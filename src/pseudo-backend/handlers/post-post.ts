import type { Post } from '#/post';
import type { PostData } from '#/post-data';
import type { Row } from '#/row';
import type { Request } from '#/request';
import type { Response } from '#/response';
import type { User } from '#/user';

import { useDB } from '%/lib/db';

function createPostRow(
  postDataRow: Row<PostData>,
  userRow: Row<User>
): Row<Post> {
  const { accountName, displayName, description } = userRow;
  const { id, content, createdAt, updatedAt } = postDataRow;
  return {
    id,
    createdAt,
    updatedAt,
    content,
    user: {
      accountName,
      displayName,
      description,
    },
  };
}

export default async function postPost(
  userId: string,
  request: Request<{}, { content: string }>
): Promise<Response<Row<Post>>> {
  const db = useDB();

  const userRow = await db.fetchSingle<Row<User>>('user', {
    index: 'idIdx',
    value: userId,
  });

  if (userRow === undefined)
    return {
      status: 400,
      message: 'Bad User',
    };

  const postData = {
    userId: userRow.id,
    content: request.body.content,
  };

  const postId = await db.add<PostData>('post-data', postData);

  const postDataRow = await db.fetchSingle<Row<PostData>>('post-data', {
    index: 'idIdx',
    value: postId,
  });

  if (postDataRow === undefined) throw new Error('Failed to fetch post');

  return {
    status: 200,
    message: createPostRow(postDataRow, userRow),
  };
}
