import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhElementsModule } from '../../../lib/ph-elements/ph-elements.module';


@NgModule({
  declarations: [
    // DashboardComponent
  ],
  imports: [
    CommonModule,
    // SituationMapModule,
    PhElementsModule,
    // SquadModule
  ]
})
export class DashboardModule { }
