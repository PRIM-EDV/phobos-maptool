import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TrxBackendService } from './backend/trx.backend.service';
import { PhElementsModule } from 'lib/ph-elements/ph-elements.module';
import { OverlayComponent } from "./overlay/overlay.component";
import { LsxBackendService } from './backend/lsx.backend.service';


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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    PhElementsModule,
    OverlayComponent
],
  providers: [
    LsxBackendService,
    TrxBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
