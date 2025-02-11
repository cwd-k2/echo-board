type ResponseSuccess<R> = {
  status: 200;
  message: R;
};

type ResponseUnknown = {
  status: number;
  message: string;
};

export type Response<R> = ResponseSuccess<R> | ResponseUnknown;

export function isResponseSuccess<R>(
  response: Response<R>
): response is ResponseSuccess<R> {
  return response.status === 200;
}
