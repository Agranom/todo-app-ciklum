import { merge } from 'lodash';
import { config } from './dev';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  port: 3000
};

export default merge(baseConfig, config);
