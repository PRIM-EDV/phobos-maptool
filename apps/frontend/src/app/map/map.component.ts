import { Component, computed, Signal } from '@angular/core';
import { Entity, EntityClickEvent, MapClickEvent, TrxMap } from '@trx/map';
import { DialogService } from '../infrastructure/ui/dialog/dialog.service';
import { CreateEntityDialogComponent } from './presentation/dialogs/create-entity/create-entity.dialog.component';
import { EntityFacadeService } from './application/entity.facade.service';
import { ContextMenuService } from '../infrastructure/ui/context-menu/context-menu.service';
import { MapEntityService } from './core/map-entity.service';
import { toEntity } from './infrastructure/mapper/entity.mapper';
import { EditEntityDialogComponent } from './presentation/dialogs/edit-entity/edit-entity.dialog.component';

@Component({
  selector: 'app-map',
  imports: [
    TrxMap,
  ],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public entities: Signal<Entity[]> = computed(() => {
    return this.entity.entities().map((e) => toEntity(e));
  }); 

  constructor(
    public readonly  entity: MapEntityService,
    private readonly contextMenu: ContextMenuService,
    private readonly dialog: DialogService,
    private readonly facade: EntityFacadeService,
  ) { }

  public handleEntityMoved(entityMoved: Entity) {
  }

  public async openCreateEntityDialog(e: MapClickEvent) {
    const newEntity = await this.dialog.open(CreateEntityDialogComponent, e);
    if (newEntity) {
      this.facade.createEntity(newEntity);
    }
  }

  public async openEditEntityDialog(ev: EntityClickEvent) 
  {
    const clickedEntity = this.entity.entities().find((e) => e.id === ev.entity.id);
    const data = { event: ev, entity: clickedEntity };

    const editedEntity  = await this.dialog.open(EditEntityDialogComponent, data);
    if (editedEntity ) {
      this.facade.updateEntity(editedEntity);
    }
  }

  public openEditContextMenu(ev: EntityClickEvent) {
    this.contextMenu.open({
      entries: [
        {
          label: "Edit",
          action: async () => {
            this.openEditEntityDialog(ev);
          },
        },
        {
          label: "Delete",
          action: async () => {
            const entity = this.entity.entities().find((e) => e.id === ev.entity.id);
            this.facade.deleteEntity(entity!);
          },
        },
      ],
      position: { x: ev.clientX, y: ev.clientY },
    });
  }

  public openNewContextMenu(ev: MapClickEvent) {
    this.contextMenu.open({
      entries: [
        {
          label: "Create",
          action: async () => {
            this.openCreateEntityDialog(ev);
          },
        },
      ],
      position: { x: ev.clientX, y: ev.clientY },
    });
  }
}
