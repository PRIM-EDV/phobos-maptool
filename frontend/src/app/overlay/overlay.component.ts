import { Component, HostBinding } from '@angular/core';
import { LsxBackendService } from '../backend/lsx.backend.service';
import { Request } from 'proto/lsx/lsx';    
import { PowerDevice, PowerState, SetDevicePowerState_Request } from 'proto/lsx/lsx.power';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {

    @HostBinding('style.display') public display: string = 'none';
    
    header: string = 'System Power Error';
    message: string = 'A critical power loss within the section has been detected. The system is shutting down to prevent data loss and hardware damage. Further information on the problem is collected and will be sent to the technical support section and system administrator. Please remain patient and wait for the problem beeing resolved. ';

    constructor(private readonly lsx: LsxBackendService) {
        lsx.onRequest.subscribe(this.handleRequest.bind(this));
    }
    
    public open() {
        this.display = 'unset';
    }

    public close() {
        this.display = 'none';
    }

    private handleRequest(e: {id: string, request: Request}) {
        // if(e.request.setMapEntity) {
        //     this.onSetMapEntity.next(e.request.setMapEntity.entity!);
        // }
        if (e.request.setDevicePowerState) {
            this.handleSetDevicePowerStateRequest(e.request.setDevicePowerState);
        }
    }  
    
    private handleSetDevicePowerStateRequest(request: SetDevicePowerState_Request) {
        if (request.device == PowerDevice.DEVICE_CIC_MAPTOOL) {
            if (request.state == PowerState.POWER_STATE_UNPOWERED) {
                this.open();
            } else {
                this.close();
            }
        }
    }
    
}
