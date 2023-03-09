import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const repo = require('../package.json');
  const logger = new Logger(setupSwagger.name);
  const configService = app.get(ConfigService<{ PORT: string }>);

  const config = new DocumentBuilder()
    .setTitle(repo.name)
    .setDescription(repo.description)
    .setVersion(repo.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  logger.log(
    `Documentation: http://localhost:${configService.get('PORT')}/docs`,
  );
}
