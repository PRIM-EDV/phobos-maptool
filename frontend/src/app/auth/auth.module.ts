import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { PhElementsModule } from 'lib/ph-elements/ph-elements.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
})
export class AuthModule { }
