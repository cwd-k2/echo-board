import type { Row } from '#/row';
import type { Post } from '#/post';
import { isResponseSuccess } from '#/response';

import { usePseudoFetch } from '@/lib/pseudo-fetch';

export async function createPost(content: string): Promise<Row<Post>> {
  const pseudoFetch = usePseudoFetch();

  const resp = await pseudoFetch<{}, { content: string }, Row<Post>>({
    method: 'POST',
    path: '/post',
    query: {},
    body: { content },
  });

  if (isResponseSuccess(resp)) {
    return resp.message;
  } else {
    throw resp;
  }
}

export async function getPostList(
  limit?: number,
  referencedAt?: Date
): Promise<Row<Post>[]> {
  const pseudoFetch = usePseudoFetch();

  const resp = await pseudoFetch<
    { limit?: number; referencedAt?: Date },
    {},
    Row<Post>[]
  >({
    method: 'GET',
    path: '/post/list',
    query: { limit, referencedAt },
    body: {},
  });

  if (isResponseSuccess(resp)) {
    return resp.message;
  } else {
    throw resp;
  }
}
