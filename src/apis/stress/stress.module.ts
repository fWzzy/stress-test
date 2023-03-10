import { CoreModule } from '@app/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Stress } from 'src/entities/stress.entity';
import { StressController } from './stress.controller';
import { StressService } from './stress.service';

@Module({
  imports: [CoreModule, MikroOrmModule.forFeature([Stress])],
  controllers: [StressController],
  providers: [StressService],
})
export class StressModule {}
