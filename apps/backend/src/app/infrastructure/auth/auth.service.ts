import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import * as jose from 'jose';

const PHOBOS_AUTH_URL = process.env.phobosAuthUrl ? process.env.phobosAuthUrl : 'http://localhost:3000';

@Injectable()
export class AuthService {

  constructor(
    private readonly http: HttpService
  ) {
  }

  /**
   * Validates a JWT token by fetching the public key from the Phobos Auth service and verifying the token.
   * 
   * @param {string} token - The JWT token to validate.
   * @returns {Promise<boolean>} - A promise that resolves to true if the token is valid, false otherwise.
   */
  public async validateToken(token: string): Promise<boolean> {
    try {
      const jwks = await this.fetchCerts();

      const publicKey = await jose.importJWK(jwks[0], "RS256");
      const { payload } = await jose.jwtVerify(token, publicKey);

      // Check if token has expired
      const now = Math.floor(Date.now() / 1000);
      if (!payload.exp || now >= payload.exp) {
        return false
      }

      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  private async fetchCerts(): Promise<any[]> {
    const url = `${PHOBOS_AUTH_URL}/auth/certs`;
    const response = await firstValueFrom(this.http.get<{ keys: any[] }>(url));

    return response.data.keys;
  }
}