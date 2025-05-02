import { Component, OnInit } from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';
import { RouterOutlet } from '@angular/router';
import { SquadModule } from './squad/squad.module';
// import { LsxBackendService } from './backend/lsx.backend.service';

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
        SquadModule,
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        // private readonly lsxBackend: LsxBackendService,
    ) { }

    ngOnInit(): void {
        // this.lsxBackend.connect();
    }

}
