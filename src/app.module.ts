import { CoreModule } from '@app/core';
import { AppConfigService } from '@app/core/services/app-config.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApisModule } from './apis/apis.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderCreatedListener } from './listeners/image-upload.listener';
import { ImageResizeWorker } from './workers/image-resize.worker';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: AppConfigService) => configService.dbConfig,
      inject: [AppConfigService],
    }),
    EventEmitterModule.forRoot(),
    CoreModule,
    ApisModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrderCreatedListener, ImageResizeWorker],
})
export class AppModule {}
