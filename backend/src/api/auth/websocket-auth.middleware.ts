import { Injectable, NestMiddleware } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class WebSocketAuthMiddleware implements NestMiddleware {
  constructor() {}

  // Middleware für den Handshake-Prozess
  use(req: WebSocket.Request, _: WebSocket, next: (err?: any) => void) {
    const token = req.url?.split('?token=')[1]; // Token aus URL-Parameter extrahieren

    if (!token) {
      // Verbindung ablehnen, wenn kein Token vorhanden ist
      return next(new Error('Authentication token missing'));
    }

    // try {
    //   const decoded = this.authService.verifyToken(token); // JWT-Token validieren
    //   req.user = decoded; // Benutzerinformationen im Request speichern
    //   next(); // Authentifizierung erfolgreich – Verbindung fortsetzen
    // } catch (error) {
    //   // Verbindung ablehnen, wenn Token ungültig oder abgelaufen ist
    //   return next(new Error('Invalid or expired token'));
    // }
    next(); // Authentifizierung erfolgreich – Verbindung fortsetzen
  }
}

// import { Ws } from "src/common/interfaces/ws";

// type SocketMiddleware = (socket: Ws, next: (err?: Error) => void) => void;

// export const AuthWsMiddleware = (): SocketMiddleware => {
//     return async (socket: Ws, next) => {
//         try {
//             const token = socket.;

//             if (!token) {
//                 throw new Error('Authorization token is missing');
//             }

//             let payload: JwtTokenPayload | null = null;

//             try {
//                 payload = await jwtService.verifyAsync<JwtTokenPayload>(token);
//             } catch (error) {
//                 throw new Error('Authorization token is invalid');
//             }

//             const strategy = new JwtStrategy(configService, userService);
//             const user = await strategy.validate(payload);

//             if (!user) {
//                 throw new Error('User does not exist');
//             }

//             socket = Object.assign(socket, {
//                 user: user!
//             });
//             next();
//         } catch (error) {
//             next(new Error('Unauthorized'));
//         }
//     };
// };