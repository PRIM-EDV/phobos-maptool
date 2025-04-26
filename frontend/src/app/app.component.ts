import { Component, OnInit } from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';
import { RouterOutlet } from '@angular/router';
// import { LsxBackendService } from './backend/lsx.backend.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        OverlayComponent,
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
