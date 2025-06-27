import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { WinstonLoggerModule } from '../logger/winston/winston.logger.module';


@Module({
  imports: [
    HttpModule,
    WinstonLoggerModule
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}