import { HttpAdapterHost } from '@nestjs/core';
import { OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MaptoolMessage, Response as MaptoolResponse, Request as MaptoolRequest } from '@phobos-maptool/protocol';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

import { Ws } from './common/interfaces/ws';
import { WinstonLogger } from './infrastructure/logger/winston/winston.logger';
import { AuthService } from './infrastructure/auth/auth.service';


import { IncomingMessage } from 'http';
import Stream from 'stream';

import * as WebSocket from 'ws';


@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnModuleInit{
  protected activeClients: Map<string, Ws> = new Map<string, Ws>();
  protected requests: Map<string, (value: MaptoolResponse) => void> = new Map<string, (value: MaptoolResponse) => void>();

  public onMessage: Subject<MaptoolMessage> = new Subject<MaptoolMessage>();
  public onRequest: Subject<{ client: Ws, msgId: string, request: MaptoolRequest }> = new Subject<{ client: Ws, msgId: string, request: MaptoolRequest }>();

  @WebSocketServer() server: WebSocket.Server;

  constructor(
    private readonly auth: AuthService,
    private readonly logger: WinstonLogger,
    private readonly http: HttpAdapterHost
  ) {
    this.logger.setContext('AppGateway');
  }

  onModuleInit() {
    const server = this.http.httpAdapter.getHttpServer();

    server.removeAllListeners('upgrade');
    server.on('upgrade', this.handleUpgrade.bind(this));
  }

  @SubscribeMessage('msg')
  handleMessage(client: Ws, payload: string): void {
    const msg = MaptoolMessage.fromJSON(JSON.parse(payload));

    if (msg.request) {
      this.onRequest.next({ client: client, msgId: msg.id, request: msg.request });
    }

    if (msg.response) {
      if (this.requests.has(msg.id)) {
        this.requests.get(msg.id)!(msg.response);
        this.requests.delete(msg.id);
      }
    }
    this.onMessage.next(msg);
  }

  handleDisconnect(client: Ws) {
    this.activeClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleUpgrade(request: IncomingMessage, socket: Stream.Duplex, head: Buffer) {
    const urlParams = new URLSearchParams(request.url?.split('?')[1]);
    const token = urlParams.get('token');

    if (!token || !(await this.auth.validateToken(token))) {
      this.logger.warn(`Unauthorized connection attempt from ${request.socket.remoteAddress || 'unknown'}`);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    } else {
      this.server.handleUpgrade(request, socket, head, (client: WebSocket, request: IncomingMessage) => {
        this.server.emit('connection',  client, request);
      });
    }
  }

  handleConnection(client: Ws, ...args: any[]) {
    const urlParams = new URLSearchParams(args[0].url.split('?')[1]);
    const token = urlParams.get('token');

    client.token = token;
    client.id = uuidv4();

    this.activeClients.set(client.id, client);
  }

  public error(clientId: string, msgId: string, err: Error) {
    const msg: MaptoolMessage = {
      id: msgId,
      error: { type: err.name, message: err.message }
    }
    this.sendToClient(this.activeClients.get(clientId), msg);
  }

  public async request(clientId: string, req: MaptoolRequest): Promise<MaptoolResponse> {
    return new Promise((resolve, reject) => {
      const msg: MaptoolMessage = {
        id: uuidv4(),
        request: req
      }

      this.requests.set(msg.id, resolve.bind(this));
      setTimeout(this.rejectOnTimeout.bind(this, msg.id, reject), 5000);
      this.sendToClient(this.activeClients.get(clientId), msg);
    });
  }

  public async requestAll(req: MaptoolRequest) {
    const requests: Promise<MaptoolResponse>[] = [];
    for (const [id, activeClient] of this.activeClients) {
      requests.push(this.request(activeClient.id, req))
    }

    return Promise.allSettled(requests);
  }

  public async requestAllButOne(clientId: string, req: MaptoolRequest) {
    const requests: Promise<MaptoolResponse>[] = [];
    for (const [id, activeClient] of this.activeClients) {
      if (activeClient.id != clientId) {
        requests.push(this.request(activeClient.id, req))
      }
    }

    return Promise.allSettled(requests);
  }

  public respond(clientId: string, msgId: string, res: MaptoolResponse) {
    const msg: MaptoolMessage = {
      id: msgId,
      response: res
    }
    this.sendToClient(this.activeClients.get(clientId), msg);
  }

  protected rejectOnTimeout(id: string, reject: (reason?: any) => void) {
    if (this.requests.delete(id)) {
      reject();
    }
  }

  protected sendToAllClients(msg: MaptoolMessage) {
    for (const [id, client] of this.activeClients) {
      this.sendToClient(client, msg);
    }
  }

  protected sendToClient(client: Ws, msg: MaptoolMessage) {
    try {
      const buffer = { event: 'msg', data: JSON.stringify(MaptoolMessage.toJSON(msg)) };
      client.send(JSON.stringify(buffer))
    } catch (error) {
      this.logger.error(`Failed to send message to client: ${error}`);
    }
  }
}
