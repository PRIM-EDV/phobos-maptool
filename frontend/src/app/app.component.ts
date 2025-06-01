import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from "./infrastructure/ui/dialog/dialog.component";
import { ContextMenuModule } from './infrastructure/ui/context-menu/context-menu.module';

import { TOKEN_SERVICE_TOKEN, ITokenService } from '@phobos/core';

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
      RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
      @Optional() @Inject(TOKEN_SERVICE_TOKEN) private tokenService: ITokenService
        // private readonly lsxBackend: LsxBackendService,
    ) { 
      console.log(this.tokenService);
    }

    ngOnInit(): void {
        // this.lsxBackend.connect();
    }

}
