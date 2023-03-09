import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoadStrategy } from '@mikro-orm/core';
import * as dotenv from 'dotenv';
import * as dotEnvExpand from 'dotenv-expand';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM-CLI');
const envPath = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
const myEnvironment = dotenv.config({ path: envPath });
dotEnvExpand.expand(myEnvironment);

logger.log(`Using env ${envPath}\n`);

export const dbConnection: Options = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE_NAME,
};

const cliConfig = {
  ...dbConnection,
  entities: ['dist/main.js'],
  entitiesTs: ['src/entities/*.ts'],
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'dist/migrations/',
    pathTs: 'src/migrations/',
    tableName: 'migrations',
    transactional: true,
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
};

export default cliConfig;
