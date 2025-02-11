export type Request<Q, T> = {
  header?: {
    token: string | null;
  };
  method: 'GET' | 'POST' | 'PUT';
  path: string;
  query: Q;
  body: T;
};
