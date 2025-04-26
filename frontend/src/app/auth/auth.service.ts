import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TRX_SERVER_HOSTNAME = window?.__env?.trxServerHostname != null ? `${window.__env.trxServerHostname}` : window.location.hostname;
const TRX_SERVER_PORT = window?.__env?.trxServerPort != null ? window.__env.trxServerPort : window.location.port;

@Injectable()
export class AuthService {

    private token: string = "";

    constructor(private readonly http: HttpClient) {

    }

    public async requestJwt(username: string, password: string): Promise<string> {
        const data = { username: username, password: password };
        const route = `${window.location.protocol}//${TRX_SERVER_HOSTNAME}:${TRX_SERVER_PORT}/api/auth/login`;

        return new Promise<string>((resolve, reject) => {
            this.http.post<{ access_token: string }>(route, data).subscribe({
                next: (res) => {
                    console.log(res);
                    this.token = res.access_token;
                    resolve(res.access_token);
                },
                error: (err) => {
                    reject(err);
                }
            })
        });
    }

    public isAuthenticated(): boolean {
        return this.token != '';
    }
}
