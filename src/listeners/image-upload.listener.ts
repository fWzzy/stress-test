import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ImageUploadEvent } from 'src/events/image-upload.event';
import { ImageResizeWorker } from 'src/workers/image-resize.worker';

@Injectable()
export class OrderCreatedListener {
  constructor(private readonly imageResizeWorker: ImageResizeWorker) {}

  @OnEvent(ImageUploadEvent.name, { async: true })
  handleOrderCreatedEvent(event: ImageUploadEvent) {
    console.log('event', event);
    this.imageResizeWorker.resize(event.src, event.size);
  }
}
