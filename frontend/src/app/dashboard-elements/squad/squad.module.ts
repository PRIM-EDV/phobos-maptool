import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquadComponent } from './squad.component';
import { SquadService } from './squad.service';
import { CreatePopupComponent } from './popups/create-popup/create-popup.component';
import { PhElementsModule } from 'lib/ph-elements/ph-elements.module';



@NgModule({
  declarations: [
    SquadComponent,
    CreatePopupComponent
  ],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  providers: [
    SquadService
  ],
  exports: [
    SquadComponent
  ]
})
export class SquadModule { }
