import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhElementsModule } from '../../../../../lib/ph-elements/ph-elements.module';
import { ContextMenuComponent } from './context-menu.component';

@NgModule({
    declarations: [
        ContextMenuComponent,
    ],
    imports: [
        CommonModule,
        PhElementsModule
    ],
    exports: [
        ContextMenuComponent,
    ]
})
export class ContextMenuModule { }