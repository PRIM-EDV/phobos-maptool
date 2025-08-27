import { Component, effect, Inject, OnInit, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from "./infrastructure/ui/dialog/dialog.component";
import { ContextMenuModule } from './infrastructure/ui/context-menu/context-menu.module';

import { TOKEN_SERVICE_TOKEN, ITokenService } from '@phobos/core';
import { MaptoolGateway } from './infrastructure/maptool.gateway';
import { OverlayComponent } from './overlay/overlay.component';
import { LsxGateway } from './infrastructure/lsx.gateway';

declare global {
  interface Window {
    __env: {
      lsxServerHostname: string,
      lsxServerPort: string,
      MAPTOOL_SERVER_HOSTNAME: string,
      MAPTOOL_SERVER_PORT: string,
      LSX_SERVER_HOSTNAME: string,
      LSX_SERVER_PORT: string
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
    OverlayComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  autoMaptoolGatewayConnection = effect(async () => {
    if (this.tokenService && !this.maptoolGateway.isConnected()) {
      await this.connectToMaptoolGateway();
    }
  });

  autoLsxGatewayConnection = effect(async () => {
    if (this.tokenService && !this.lsxGateway.isConnected()) {
      await this.connectToLsxGateway();
    }
  });

  constructor(
    private readonly maptoolGateway: MaptoolGateway,
    private readonly lsxGateway: LsxGateway,
    @Optional() @Inject(TOKEN_SERVICE_TOKEN) private tokenService: ITokenService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.tokenService) {
      console.warn('Token service is not available, skipping Maptool Gateway connection');
    }
  }

  private async connectToMaptoolGateway(): Promise<void> {
    const token = this.tokenService?.accessToken() || '';
    if (token) {
      try {
        await this.maptoolGateway.connect(token);
      } catch (error) {
        console.error('Error connecting to Maptool Gateway:', error);
        setTimeout(async () => {
          await this.connectToMaptoolGateway();
        }, 5000);
      }
    } else {
      console.warn('No token found, unable to connect to Maptool Gateway');
    }
  }

  private async connectToLsxGateway(): Promise<void> {
    const token = this.tokenService?.accessToken() || '';
    if (token) {
      try {
        console.log('Connecting to Lsx Gateway...');
        await this.lsxGateway.connect(token);
      } catch (error) {
        console.error('Error connecting to Lsx Gateway:', error);
        setTimeout(async () => {
          await this.connectToLsxGateway();
        }, 5000);
      }
    } else {
      console.warn('No token found, unable to connect to Lsx Gateway');
    }
  }
}
