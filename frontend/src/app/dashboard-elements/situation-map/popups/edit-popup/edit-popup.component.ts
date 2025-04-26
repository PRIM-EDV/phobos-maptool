import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapEntityType } from '../../rld-map/common/map-entity';
import { SituationMapEntity } from '../../common/situation-map-entity';
import { PhWindowComponent } from 'lib/ph-elements/ph-window/ph-window.component';


@Component({
  selector: 'edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class EditPopupComponent implements AfterViewInit {
  
    MapEntityType = MapEntityType;

    @ViewChild(PhWindowComponent) window!: PhWindowComponent;

    @Output() edit = new EventEmitter<SituationMapEntity>();

    public entity: SituationMapEntity = new SituationMapEntity();
  
    constructor() { }

    ngAfterViewInit(): void {
        this.window.hide();
    }


    public apply() {
        this.edit.next(this.entity);
        this.window.hide();
    } 

    public open(cursorPosition: {x: number, y: number}, mapPosition: {x: number, y: number}, entity: SituationMapEntity) {
        this.window.ref.nativeElement.style.top = `${cursorPosition.y}px`;
        this.window.ref.nativeElement.style.left = `${cursorPosition.x}px`;

        this.entity = SituationMapEntity.copy(entity);
        this.window.show();
    }

    public close() {
        this.window.hide();
    }

    public cancel() {
        this.entity = new SituationMapEntity();
        this.close();
    }
}
