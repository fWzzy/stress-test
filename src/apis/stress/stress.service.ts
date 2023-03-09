import { Injectable } from '@nestjs/common';
import { CreateStressLevelDto } from './dtos/create-stress-level';

@Injectable()
export class StressService {
    uploadImage() { }
    insertStressData(stressData: CreateStressLevelDto) { }
}
