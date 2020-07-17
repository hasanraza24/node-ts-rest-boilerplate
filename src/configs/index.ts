import * as config from './config.json'

process.env.NODE_ENV = config.env

type JsonConfig = {
  env: 'dev' | 'prod' | 'test';
  nodePort: number,
  mongo: {
    host: string,
    port: string,
    dbName: string
  },
  jwtSecret: string
};

const { env, mongo, nodePort, jwtSecret } = config as JsonConfig;

export { env, mongo, nodePort, jwtSecret };