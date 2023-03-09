import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { IAuthenticationPayload } from 'src/types/authentication.interface';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiOkResponse({ status: 201, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<Partial<User>> {
    const createdUser = await this.authService.register(userRegisterDto);

    return createdUser;
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({
    status: 403,
    description: 'You account has not been activated yet!',
  })
  @ApiOkResponse({
    status: 400,
    description: 'User name and password provided does not match.',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<IAuthenticationPayload> {
    return this.authService.login(userLoginDto);
  }
}
