import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { AuthService } from './auth.service';


@Module({
  imports: [
    HttpModule,
    WinstonLoggerModule
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}