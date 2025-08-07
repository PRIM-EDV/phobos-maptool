import { Component, effect, Inject, OnInit, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from "./infrastructure/ui/dialog/dialog.component";
import { ContextMenuModule } from './infrastructure/ui/context-menu/context-menu.module';

import { TOKEN_SERVICE_TOKEN, ITokenService } from '@phobos/core';
import { MaptoolGateway } from './infrastructure/maptool.gateway';
import { OverlayComponent } from './overlay/overlay.component';

declare global {
    interface Window {
      __env: {
        lsxServerHostname: string,
        lsxServerPort: string,
        trxServerHostname: string,
        trxServerPort: string
      }
    }
  }

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      ContextMenuModule,
      DialogComponent,
      RouterOutlet,
      // OverlayComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    autoGatewayConnection = effect(() => {
      if (this.tokenService && !this.maptoolGateway.isConnected()) {
          this.connectToMaptoolGateway().catch(error => {
            console.error('Failed to connect to Maptool Gateway:', error);
          });
      }
    });

    constructor(
      private readonly maptoolGateway: MaptoolGateway,
      @Optional() @Inject(TOKEN_SERVICE_TOKEN) private tokenService: ITokenService
    ) {}

    async ngOnInit(): Promise<void> {
      if (!this.tokenService) {
        console.warn('Token service is not available, skipping Maptool Gateway connection');
      }
     }

    private async connectToMaptoolGateway(): Promise<void> {
      const token = this.tokenService?.accessToken() || '';
      if (token) {
        await this.maptoolGateway.connect(token);
      } else {
        console.warn('No token found, unable to connect to Maptool Gateway');
      }
    }
}
