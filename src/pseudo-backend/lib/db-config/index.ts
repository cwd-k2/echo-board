import type { DBConfig } from '%/lib/db-config/types';

import userConfig from './user';
import userPasswordConfig from './user-password';

const configs: DBConfig[] = [
  // 追記していく
  userConfig,
  userPasswordConfig,
];

export default configs;
