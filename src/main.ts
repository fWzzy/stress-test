import { CoreModule } from '@app/core';
import { HttpExceptionFilter } from '@app/core/filters/bad-request.filter';
import { AppConfigService } from '@app/core/services/app-config.service';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.enable('trust proxy');
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    // new QueryFailedFilter(reflector),
  );

  const configService = app.select(CoreModule).get(AppConfigService);

  if (configService.apiDocEnabled) {
    setupSwagger(app);
  }

  await app.listen(configService.appConfig.port);
}
bootstrap();
