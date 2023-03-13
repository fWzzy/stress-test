import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';

@Injectable()
export class ImageResizeWorker {
  private resizePool: Piscina;

  constructor() {
    this.resizePool = new Piscina({
      filename: resolve(__dirname, 'runners/image-resize.js'),
    });
  }

  public async resize(src: string, sizes: string[]): Promise<number> {
    try {
      const resized = await this.resizePool.run({ src, sizes });
      return resized;
    } catch (error) {
      throw error;
    }
  }
}
