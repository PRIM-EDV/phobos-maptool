import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapEntity, MapEntityStatus } from 'proto/trx/trx.entity';
import { TrxBackendService } from 'src/app/backend/trx.backend.service';
import { SituationMapEntity } from './common/situation-map-entity';
import { CreatePopupComponent } from './popups/create-popup/create-popup.component';
import { EditPopupComponent } from './popups/edit-popup/edit-popup.component';
import { MapEntityType } from './rld-map/common/map-entity';
import { MapEntityData } from './rld-map/common/map-entity-data';
import { MapComponent } from './rld-map/map.component';
import { SituationMapService } from './situation-map.service';
import { PhContextMenuComponent } from 'lib/ph-elements/ph-context-menu/ph-context-menu.component';

@Component({
  selector: 'situation-map',
  templateUrl: './situation-map.component.html',
  styleUrls: ['./situation-map.component.scss']
})
export class SituationMapComponent implements OnInit, AfterViewInit {

    @ViewChild(MapComponent) map!: MapComponent;
    @ViewChild("terrainContextMenu") terrainContextMenu!: PhContextMenuComponent;
    @ViewChild("entityContextMenu") entityContextMenu!: PhContextMenuComponent;
    @ViewChild(CreatePopupComponent) createPopup!: CreatePopupComponent;
    @ViewChild(EditPopupComponent) editPopup!: EditPopupComponent;

    private entity = new MapEntityData();
    private position = {x: 0, y: 0};  
    private mapPosition = {x: 0, y: 0};

    private situationMapEntities: Map<string, SituationMapEntity> = new Map<string, SituationMapEntity>();

    constructor(public readonly backend: TrxBackendService, private readonly sitationMapService: SituationMapService, private ref: ElementRef) {
        this.backend.onOpen.subscribe(() => {
            this.sitationMapService.getAllMapEntities().then(this.setLocalMapEntities.bind(this));
        })

        this.sitationMapService.onSetMapEntity.subscribe(this.setLocalMapEntity.bind(this));
        this.sitationMapService.onDeleteMapEntity.subscribe(this.deleteLocalMapEntity.bind(this));

     }

    ngOnInit(): void {
        if (this.backend.isConnected) {
            console.log("init")
            this.sitationMapService.getAllMapEntities().then(this.setLocalMapEntities.bind(this));
        }
    }

    ngAfterViewInit(): void {
        this.createPopup.close();
        this.editPopup.close();
        this.terrainContextMenu.close();
        this.entityContextMenu.close();
    }

    public createEntity(entity: SituationMapEntity) {
        this.situationMapEntities.set(entity.id, entity);
        this.sitationMapService.setMapEntity(entity);
        this.map.createMapEntity(entity.getData());
    }

    public editEntity(entity: SituationMapEntity) {
        this.situationMapEntities.delete(entity.id);
        this.situationMapEntities.set(entity.id, entity);
        this.sitationMapService.setMapEntity(entity);
        this.map.createOrUpdateMapEntity(entity.getData());
    }

    public deleteEntity() {
        const entity = this.situationMapEntities.get(this.entity.id);

        if (entity) {
            this.deleteLocalMapEntity(this.entity);
            this.sitationMapService.deleteMapEntity(entity);
        }
        this.entityContextMenu.close();
    }

    public toggleEntityPing(data: MapEntityData) {
        this.map.toggleEntityPing(data.id);

        const entity = this.situationMapEntities.get(data.id);
        if (entity) {
            if (entity.squad.status == MapEntityStatus.ENTITY_STATUS_COMBAT) { 
                entity.squad.status = MapEntityStatus.ENTITY_STATUS_REGULAR;
            } else {
                entity.squad.status = MapEntityStatus.ENTITY_STATUS_COMBAT;
            }

            this.sitationMapService.setMapEntity(entity);
        }
    }

    public handleEntityMoved(data: MapEntityData) {
        const entity = this.situationMapEntities.get(data.id);
        if (entity) {
            entity.setData(data);
            this.sitationMapService.setMapEntity(entity);
        }
    }

    public openContextMenu(ev: {cursorPosition: {x: number, y: number}, mapPosition: {x: number, y: number}}) {
        this.position = ev.cursorPosition;
        this.mapPosition = ev.mapPosition;
        this.terrainContextMenu.open(this.position);
    }

    public openUnitCreateMenu() {
        const rect = this.ref.nativeElement.getBoundingClientRect() as DOMRect;
        const position = {x: rect.width / 2 - 256, y: rect.height / 2 - 24};
        this.terrainContextMenu.close();
        this.createPopup.open(position, this.mapPosition);
    }

    public openEntityEditMenu() {
        this.entityContextMenu.close();
        this.editPopup.open(this.position, this.mapPosition, this.situationMapEntities.get(this.entity.id)!);
    }

    public openEntityContextMenu(ev: {cursorPosition: {x: number, y: number}, mapPosition: {x: number, y: number}, entity: MapEntityData}) {
        this.position = ev.cursorPosition;
        this.mapPosition = ev.mapPosition;
        this.entity = ev.entity;
        this.entityContextMenu.open(this.position);
    }

    private deleteLocalMapEntity(entity: MapEntity) {
        this.situationMapEntities.delete(entity.id);
        this.map.deleteMapEntity(entity.id);
    }

    private setLocalMapEntities(entities: MapEntity[]) {
        for(const entity of entities) {
            this.setLocalMapEntity(entity);
        }
    }

    private setLocalMapEntity(entity: MapEntity) {
        let situationMapEntity = new SituationMapEntity();
        if (this.situationMapEntities.has(entity.id)) {
            situationMapEntity = this.situationMapEntities.get(entity.id)!;
        } else {
            situationMapEntity.id = entity.id;
            this.situationMapEntities.set(entity.id, situationMapEntity);
        }

        situationMapEntity.position = entity.position!;
        situationMapEntity.type = entity.type as MapEntityType;

        if(entity.type == MapEntityType.TYPE_FRIEND) {
            situationMapEntity.squad = entity.squad!;
        }

        if(entity.type == MapEntityType.TYPE_FOE) {
            situationMapEntity.enemy = entity.enemy!;
        }

        if(entity.type == MapEntityType.TYPE_OBJECT) {
            situationMapEntity.objective = entity.objective!;
        }

        this.map.createOrUpdateMapEntity(situationMapEntity.getData());
    }


}
