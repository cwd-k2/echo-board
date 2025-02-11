import type { UserToken } from '#/user-token';
import { isResponseSuccess } from '#/response';

import { usePseudoFetch } from '@/lib/pseudo-fetch';
import { useAuthInfoStore } from '@/store/authInfoStore';

export async function login(accountName: string, password: string) {
  const authInfoStore = useAuthInfoStore();
  const pseudoFetch = usePseudoFetch();

  const resp = await pseudoFetch<{}, any, UserToken>({
    method: 'POST',
    path: '/auth/login',
    query: {},
    body: {
      accountName,
      password,
    },
  });

  if (isResponseSuccess(resp)) {
    authInfoStore.putToken(resp.message.token);
    authInfoStore.putAuthUser(resp.message.user);
  } else {
    throw resp;
  }
}

export async function register(accountName: string, password: string) {
  const authInfoStore = useAuthInfoStore();
  const pseudoFetch = usePseudoFetch();

  const resp = await pseudoFetch<{}, any, UserToken>({
    method: 'POST',
    path: '/auth/register',
    query: {},
    body: {
      accountName,
      password,
    },
  });

  if (isResponseSuccess(resp)) {
    authInfoStore.putToken(resp.message.token);
    authInfoStore.putAuthUser(resp.message.user);
  } else {
    throw resp;
  }
}
