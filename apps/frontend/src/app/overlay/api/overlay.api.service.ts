import { Injectable } from "@angular/core";

import { LsxRequestHandler } from "../../infrastructure/rpc/lsx-request-handler.base";
import { PowerDevice, SetDevicePowerState, SetDevicePowerState_Request } from "@phobos-lsx/protocol";
import { OverlayService } from "../overlay.service";

@Injectable({
  providedIn: 'root'
})
export class OverlayApiService extends LsxRequestHandler {

    constructor(
        private readonly overlayService: OverlayService
    ) {
        super();
    }

    private async setDevicePowerState(request: SetDevicePowerState_Request) {
        if (request.device == PowerDevice.DEVICE_CIC_MAPTOOL) {
            this.overlayService.isMaptoolPowered.set(request.state);
        }
    }
}