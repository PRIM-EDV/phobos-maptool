import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituationMapComponent } from './situation-map.component';
import { MapModule } from './rld-map/map.module';
import { CreatePopupComponent } from './popups/create-popup/create-popup.component';
import { EditPopupComponent } from './popups/edit-popup/edit-popup.component';
import { SituationMapService } from './situation-map.service';
import { PhElementsModule } from 'lib/ph-elements/ph-elements.module';



@NgModule({
  declarations: [
    SituationMapComponent,
    CreatePopupComponent,
    EditPopupComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    PhElementsModule
  ],
  providers: [
    SituationMapService
  ],
  exports: [
    SituationMapComponent
  ]
})
export class SituationMapModule { }
