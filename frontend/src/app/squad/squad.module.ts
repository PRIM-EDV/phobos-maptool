import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquadComponent } from './squad.component';
import { PhElementsModule } from '../../../lib//ph-elements/ph-elements.module';
import { CreateSquadDialogComponent } from './presentation/dialogs/create-squad/create-squad.dialog.component';

@NgModule({
    declarations: [
        SquadComponent,
        CreateSquadDialogComponent
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