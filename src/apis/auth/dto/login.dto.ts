import { Trim } from '@app/core/decorators/transform.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsEmail()
  @Trim()
  @ApiProperty({ default: 'chung.pt912@gmail.com' })
  readonly email: string;

  @IsString()
  @Trim()
  @ApiProperty({ minLength: 6, default: '123456@abc' })
  readonly password: string;
}
