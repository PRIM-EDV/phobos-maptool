import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const USERS : {name: string, password: string}[] = [
  {name: "admin", password: "admin"}
]

@Injectable()
export class AuthApiService {

    constructor(
        private jwtService: JwtService
      ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        return USERS.find((user) => user.name == username && user.password == pass);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}