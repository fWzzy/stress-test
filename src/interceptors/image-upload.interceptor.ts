import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { AppConfigService } from '@app/core/services/app-config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageUploadEvent } from 'src/events/image-upload.event';
import { extname } from 'path';

interface ImageUploadInterceptorOptions {
  fieldName: string;
  path?: string;
}

export function ImageUploadInterceptor(
  options: ImageUploadInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(
      configService: AppConfigService,
      private eventEmitter: EventEmitter2,
    ) {
      const filesDestination = configService.uploadPath;

      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: (req: any, file: any, cb: any) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');

            const fileName = `${randomName}${extname(file.originalname)}`;

            const imageUploadEvent = new ImageUploadEvent();
            imageUploadEvent.src = `${destination}/${fileName}`;
            imageUploadEvent.size = ['100x100', '200x200'];
            this.eventEmitter.emit(ImageUploadEvent.name, imageUploadEvent);

            cb(null, fileName);
          },
        }),
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}
