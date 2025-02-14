import type { Request } from '#/request';
import type { Response } from '#/response';

import getUser from '%/handlers/get-user';
import authLogin from '%/handlers/auth-login';
import authRegister from '%/handlers/auth-register';
import postPost from './post-post';
import getPostList from './get-post-list';
import { verifyUser } from '%/lib/auth';

// 引数が 2 のときは認証情報が必須
type HandlerAuthNeeded<Q, T, R> = (
  userId: string,
  request: Request<Q, T>
) => Promise<R>;

// 認証が必要ない処理
type HandlerWithoutAuth<Q, T, R> = (
  request: Request<Q, T> //
) => Promise<R>;

type Handler<Q, T, R> =
  | HandlerAuthNeeded<Q, T, R>
  | HandlerWithoutAuth<Q, T, R>;

// 認証情報が必要かどうかの判別
function needsAuth<Q, T, R>(
  handler: Handler<Q, T, R>
): handler is HandlerAuthNeeded<Q, T, R> {
  return handler.length === 2;
}

// request path vs handler
const handlerMap = new Map<string, Handler<any, any, any>>([
  // ハンドラを登録
  // パスパラメータのマッチングなんてものはないから query と body で我慢して
  ['GET /user', getUser],
  ['POST /auth/login', authLogin],
  ['POST /auth/register', authRegister],
  ['POST /post', postPost],
  ['GET /post/list', getPostList],
]);

export default {
  async handle(request: Request<any, any>): Promise<Response<any>> {
    const { header, method, path } = request;

    const handler = handlerMap.get(`${method} ${path}`);

    if (!handler) {
      return {
        status: 400,
        message: 'Bad Request',
      };
    }

    if (!needsAuth(handler)) {
      return await handler(request).catch((err: any) => ({
        status: 500,
        message: err,
      }));
    }

    if (!header?.token) {
      return {
        status: 401,
        message: 'Not authorized',
      };
    }

    let userId;
    try {
      userId = await verifyUser(header?.token);
    } catch {
      return {
        status: 403,
        message: 'Invalid token',
      };
    }

    // 適当なエラーを投げると 500 番になる
    return await handler(userId, request).catch((err: any) => ({
      status: 500,
      message: err,
    }));
  },
};
