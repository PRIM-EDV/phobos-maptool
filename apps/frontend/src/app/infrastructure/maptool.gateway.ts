import { Injectable, signal, WritableSignal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MaptoolMessage, Request, Response } from "@phobos-maptool/protocol";

import { environment } from "../../environments/environment";

const MAPTOOL_SERVER_HOSTNAME = environment.maptoolApiHostname || window?.__env?.trxServerHostname || window.location.hostname;
const MAPTOOL_SERVER_PORT = environment.maptoolApiPort || window?.__env?.trxServerPort || 3002;

const REST_API_URL = `http://${window.location.host}`;
const WS_URL = `ws://${MAPTOOL_SERVER_HOSTNAME}:${MAPTOOL_SERVER_PORT}`;

@Injectable(
    { providedIn: 'root' }
)
export class MaptoolGateway {
    public onRequest: Subject<{id: string, request: Request}> = new Subject<{id: string, request: Request}>();
    public onMessage: Subject<MaptoolMessage> = new Subject<MaptoolMessage>();
    public onOpen: Subject<void> = new Subject<void>();
    public onClose: Subject<void> = new Subject<void>();

    public isConnected: WritableSignal<boolean> = signal(false);

    private requests: Map<string, (value: Response) => void> = new Map<string, (value: Response) => void>();
    private ws!: WebSocketSubject<any>;

    constructor() {}

    public async connect(jwt: string) {
        this.ws = webSocket({url: `${WS_URL}?token=${jwt}`, openObserver: { 
            next: () => { 
                this.isConnected.set(true); 
                this.onOpen.next();
        }}});

        this.ws.subscribe({
            next: this.handleMessage.bind(this),
            error: this.handleClose.bind(this),
            complete: this.handleClose.bind(this)
        });
    }

    public request(req: Request): Promise<Response> {
        return new Promise((resolve, reject) => {
            const msg: MaptoolMessage = {
                id: uuidv4(),
                request: req
            }
            this.requests.set(msg.id, resolve.bind(this));
            setTimeout(this.rejectOnTimeout.bind(this, msg.id, reject.bind(this, `${req} timed out`)), 5000);
            this.ws.next({event: 'msg', data: JSON.stringify(MaptoolMessage.toJSON(msg))});
        });

    }

    public respond(id: string, res: Response) {
        const msg: MaptoolMessage = {
            id: id,
            response: res
        }
        this.ws.next({event: 'msg', data: JSON.stringify(MaptoolMessage.toJSON(msg))});
    }

    private handleMessage(buffer: {event: 'msg', data: string}) {
        const msg = MaptoolMessage.fromJSON(JSON.parse(buffer.data));

        if(msg.request) {
            this.onRequest.next({id: msg.id, request: msg.request});
        }

        if(msg.response) {
            if(this.requests.has(msg.id)) {
                this.requests.get(msg.id)!(msg.response);
                this.requests.delete(msg.id);
            }
        }

        this.onMessage.next(msg);
    }

    private handleClose() {
        this.isConnected.set(false);
        setTimeout(this.connect.bind(this), 5000);
        this.onClose.next();
    }

    private rejectOnTimeout(id: string, reject: (reason?: any) => void) {
        if(this.requests.delete(id)) {
            reject();
        };
    }
}
