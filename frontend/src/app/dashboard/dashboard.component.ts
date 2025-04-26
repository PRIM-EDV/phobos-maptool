import { Component, OnInit } from '@angular/core';
import { TrxBackendService } from '../backend/trx.backend.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public view: string = "TACOP";
  public tab: string = "MAP"

  constructor(
    private readonly trxBackend: TrxBackendService
  ) { }

  ngOnInit(): void {
    this.trxBackend.connect();
  }

}
