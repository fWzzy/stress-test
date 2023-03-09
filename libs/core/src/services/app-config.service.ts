import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { isNil } from 'lodash';
import { LoadStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
    // AppConfigService
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get appConfig() {
    return {
      port: this.get<string>('PORT'),
    };
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV;
  }

  get apiDocEnabled(): boolean {
    return this.get<boolean>('ENABLE_API_DOC');
  }

  get dbConfig(): Options {
    return {
      type: 'mariadb',
      host: this.get<string>('DB_HOST'),
      port: 3306,
      user: this.get<string>('DB_USERNAME'),
      password: this.get<string>('DB_PASSWORD'),
      dbName: this.get<string>('DB_DATABASE_NAME'),
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
      allowGlobalContext: true,
      loadStrategy: LoadStrategy.JOINED,
      highlighter: new SqlHighlighter(),
    };
  }

  get jwt(): { secret: string; accessExpiry: string } {
    return {
      secret: this.get<string>('JWT_SECRET'),
      accessExpiry: this.get<string>('JWT_ACCESS_EXPIRY'),
    };
  }

  private get<T>(key: string): T {
    const value = this.configService.get<T>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
