import { GenericController } from '@app/core/decorators/generic-controller.decorator';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { CreateStressLevelDto } from './dtos/create-stress-level';

@GenericController('stress', false)
export class StressController {

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    addStressRecord(@Body() dto: CreateStressLevelDto) {
        
    }

    @Get()
    getAllStress() {
        
    }
}
