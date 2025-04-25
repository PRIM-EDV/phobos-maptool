import { Module } from '@nestjs/common';
import { AuthApiService } from './auth.api.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthApiController } from './auth.api.controller';

export const jwtConstants = {
  secret: '37GqbZWodvVxnJ4L4NFU',
};

@Module({
  controllers: [
    AuthApiController,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthApiService, LocalStrategy],
})
export class AuthApiModule {}
