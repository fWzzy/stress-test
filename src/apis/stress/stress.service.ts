import { Injectable } from '@nestjs/common';
import { Stress } from 'src/entities/stress.entity';
import { StressRepository } from 'src/repositories/stress.repository';
import { CreateStressLevelDto } from './dtos/create-stress-level';

@Injectable()
export class StressService {
  constructor(private readonly stressRepository: StressRepository) {}

  async insertStressData(
    stressData: CreateStressLevelDto,
    clientId: string | null = null,
  ): Promise<Partial<Stress>> {
    const { level, image } = stressData;

    const newStressRecord = this.stressRepository.create({
      clientId,
      level,
      image,
    });
    await this.stressRepository.persistAndFlush(newStressRecord);

    return newStressRecord;
  }

  async getStressData(clientId: string) {
    return clientId ? await this.stressRepository.find({ clientId }) : [];
  }
}
