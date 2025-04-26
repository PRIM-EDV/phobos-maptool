import { Component, OnInit } from '@angular/core';
import { LsxBackendService } from './backend/lsx.backend.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private readonly lsxBackend: LsxBackendService,
    ) { }

    ngOnInit(): void {
        this.lsxBackend.connect();
    }

}
