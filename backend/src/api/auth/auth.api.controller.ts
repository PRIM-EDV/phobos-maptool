import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthApiService } from './auth.api.service';

@Controller('api/auth')
export class AuthApiController {
  constructor(private readonly authService: AuthApiService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}



