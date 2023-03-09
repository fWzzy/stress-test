import { Trim } from '@app/core/decorators/transform.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({ default: 'chung.pt912@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6, default: '123456@abc' })
  @IsString()
  @MinLength(6)
  @Trim()
  readonly password: string;
}
