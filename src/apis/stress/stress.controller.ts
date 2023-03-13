import { Cookies } from '@app/core/decorators/cookies.decorator';
import { GenericController } from '@app/core/decorators/generic-controller.decorator';
import {
  Body,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Response, Express } from 'express';
import { ImageUploadInterceptor } from 'src/interceptors/image-upload.interceptor';
import { CreateStressLevelDto } from './dtos/create-stress-level';
import { StressService } from './stress.service';

@GenericController('stress', false)
export class StressController {
  constructor(private readonly stressService: StressService) {}

  @Post()
  @UseInterceptors(
    ImageUploadInterceptor({
      fieldName: 'image',
      path: '/stress-images',
    }),
  )
  @ApiConsumes('multipart/form-data')
  async addStressRecord(
    @Body() dto: CreateStressLevelDto,
    @UploadedFile() image: Express.Multer.File,
    @Cookies('clientId') clientId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(image);
    clientId = clientId || randomUUID();

    const newStressRecord = await this.stressService.insertStressData(
      { image: image.filename, ...dto },
      clientId,
    );

    response.cookie('clientId', newStressRecord.clientId);

    return newStressRecord;
  }

  @Get()
  getAllStress(@Cookies('clientId') clientId: string) {
    return this.stressService.getStressData(clientId);
  }
}
