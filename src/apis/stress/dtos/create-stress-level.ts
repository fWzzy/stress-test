import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { StressLevel } from 'src/entities/stress.entity';

export class CreateStressLevelDto {
  @ApiProperty({ enum: StressLevel })
  @IsNotEmpty()
  level: StressLevel;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
}
