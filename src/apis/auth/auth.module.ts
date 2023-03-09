import { CoreModule } from '@app/core';
import { AppConfigService } from '@app/core/services/app-config.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CoreModule,
    MikroOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [CoreModule],
      useFactory: async (configService: AppConfigService) => ({
        isGlobal: true,
        secret: configService.jwt.secret,
        signOptions: {
          expiresIn: configService.jwt.accessExpiry,
          algorithm: 'HS256',
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
