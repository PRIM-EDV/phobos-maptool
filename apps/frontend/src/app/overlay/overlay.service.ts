import { computed, effect, HostBinding, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { LsxGateway } from "../infrastructure/lsx.gateway";
import { OverlayRpcAdapter } from "./rpc/overlay.rpc.adapter";
import { PowerDevice, PowerState } from "@phobos-lsx/protocol";

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
    public isMaptoolPowered: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);

    maptoolPoweredInit = effect(async () => {
        if (this.gateway.isConnected()) {
            this.isMaptoolPowered.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_CIC_MAPTOOL));
        }
    });

    constructor(
        private readonly gateway: LsxGateway,
        private readonly rpc: OverlayRpcAdapter
    ) {
        
     }
}
