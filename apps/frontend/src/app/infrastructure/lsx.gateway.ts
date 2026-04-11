import { Injectable } from "@angular/core";

import { RpcGateway } from "@phobos/common";
import { LsxMessage, Request, Response } from "@phobos-lsx/protocol";


const LSX_SERVER_HOSTNAME = window?.__env?.LSX_SERVER_HOSTNAME || window.location.hostname;
const LSX_SERVER_PORT = window?.__env?.LSX_SERVER_PORT || 3002;

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
const WS_URL = `${WS_PROTOCOL}://${LSX_SERVER_HOSTNAME}:${LSX_SERVER_PORT}`;

@Injectable(
  { providedIn: 'root' }
)
export class LsxGateway extends RpcGateway<LsxMessage, Request, Response> {
  protected override apiUrl: string = "";

  constructor() { 
    super(LsxMessage);
  }
}
