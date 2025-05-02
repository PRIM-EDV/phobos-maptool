import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquadComponent } from './squad.component';
import { PhElementsModule } from '../../../lib//ph-elements/ph-elements.module';
import { SquadService } from './core/squad.service';
// import { CreatePopupComponent } from './presentation/popups/create-popup/create-popup.component';

@NgModule({
    declarations: [
        SquadComponent,
        // CreatePopupComponent
    ],
    imports: [
        CommonModule,
        PhElementsModule,
    ],
    exports: [
        SquadComponent,
    ],
    providers: [
    ]
})
export class SquadModule { }