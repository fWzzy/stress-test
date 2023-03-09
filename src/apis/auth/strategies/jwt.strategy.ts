import { AppConfigService } from '@app/core/services/app-config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly config: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number }) {
    const { sub: id } = payload;

    return await this.usersRepo.findOne({ id });
  }
}
