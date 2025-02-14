import type { DBConfig } from '%/lib/db-config/types';

import userConfig from './user';
import userPasswordConfig from './user-password';
import postDataConfig from './post-data';

const configs: DBConfig[] = [
  // 追記していく
  userConfig,
  userPasswordConfig,
  postDataConfig,
];

export default configs;
