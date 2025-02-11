import type { Request } from '#/request';
import type { Response } from '#/response';
import PseudoBackendWorker from '%/index?worker';

import { getToken } from '@/lib/auth';
import { inject, provide } from '@/lib/injector';

export type PseudoFetch = <Q, T, R>(
  request: Request<Q, T>
) => Promise<Response<R>>;

// vue app の初期化時に一緒に作成したいのでこの形式を取る
export function installPseudoFetch() {
  // web worker を通して fetch ぽいことをする
  const worker = new PseudoBackendWorker();
  // fetch の resolve を登録
  const resolverMap = new Map<
    string, // UUID
    (r: Response<any> | PromiseLike<Response<any>>) => void
  >();

  // コールバック形式でしかやりとりできない
  // それぞれのイベントに id を割り当てることで promise 化する
  worker.onmessage = (event) => {
    const { id, data } = event.data;

    if (resolverMap.has(id)) {
      resolverMap.get(id)!(data); // has だからあるだろ...
      resolverMap.delete(id);
    }
  };

  // 疑似 fetch 処理本体 (そんなに難しいことしてない)
  function pseudoFetch<Q, T, R>(request: Request<Q, T>): Promise<Response<R>> {
    return new Promise((resolve) => {
      const id = crypto.randomUUID();
      resolverMap.set(id, resolve);

      // token を自動で付与する
      const token = request.header?.token;
      worker.postMessage({
        id,
        type: 'web-request',
        request: token
          ? request
          : { header: { token: getToken() }, ...request },
      });
    });
  }

  provide('pseudo-fetch', pseudoFetch);
}

// 雑に injector から取ってもらう
export function usePseudoFetch(): PseudoFetch {
  return inject<PseudoFetch>('pseudo-fetch');
}
