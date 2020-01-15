import { merge } from 'lodash';
import devConfig from './dev';
import prodConfig from './prod';
import testingConfig from './testing';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  port: process.env.PORT || 8000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '1d',
  },
};

let envConfig = {};

switch (env) {
  case 'prod':
  case 'production':
    envConfig = prodConfig;
    break;
  case 'dev':
  case 'development':
    envConfig = devConfig;
    break;
  case 'test':
  case 'testing':
    envConfig = testingConfig;
    break;
  default:
    envConfig = devConfig;
}


export default merge(baseConfig, envConfig);
