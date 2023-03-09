import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { verify } from 'argon2';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { IAuthenticationPayload } from 'src/types/authentication.interface';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly BASE_OPTIONS: JwtSignOptions = {
    issuer: 'nestify',
    audience: 'nestify',
  };

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(
    userRegisterDto: UserRegisterDto,
  ): Promise<Partial<User>> {
    const existUser = await this.userRepo.findOne({
      email: userRegisterDto.email,
    });

    if (existUser) throw new BadRequestException('User exist');
    const newUser = this.userRepo.create(userRegisterDto);
    await this.userRepo.persistAndFlush(newUser);

    return newUser;
  }

  public async login({
    email,
    password,
  }: UserLoginDto): Promise<IAuthenticationPayload> {
    const loginUser = await this.userRepo.findOne({
      email,
      isObsolete: false,
    });

    if (!loginUser) throw new ForbiddenException('User not found');

    const validPwd = await verify(loginUser.password, password);

    if (!validPwd) throw new BadRequestException('Password incorrect');

    const access_token = await this.generateAccessToken(loginUser);

    return {
      user: {
        id: loginUser.id,
        idx: loginUser.idx,
      },
      payload: {
        access_token,
      },
    };
  }

  private generateAccessToken({ id, email }: User): Promise<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(id),
    };

    return this.jwtService.signAsync({ id, email }, options);
  }
}
