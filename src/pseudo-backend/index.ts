import type { Request } from '#/request';

import handler from '%/handlers';
import { installDB } from '%/lib/db';

// この形式で飛んでくる
type PseudoFetchEvent = {
  data: {
    id: string;
    type: string;
    request: Request<any, any>;
  };
};

await installDB().then(() => {
  self.addEventListener('message', (event) => {
    const { id, type, request } = (event as unknown as PseudoFetchEvent).data;

    if (type !== 'web-request') {
      self.postMessage({
        id,
        data: { status: 400, message: 'Unknown message' },
      });
    }

    handler.handle(request).then((response) => {
      self.postMessage({ id, data: response });
    });
  });
});
