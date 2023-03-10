import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { StressModule } from './stress/stress.module';

@Module({
  imports: [
    AuthModule,
    // BookModule,
    StressModule,
  ],
  exports: [
    AuthModule,
    // BookModule,
    StressModule,
  ],
})
export class ApisModule {}
