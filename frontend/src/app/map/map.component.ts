import { Component, computed, Signal } from '@angular/core';
import { Entity, TrxMap } from '@trx/map';
import { DialogService } from '../infrastructure/ui/dialog/dialog.service';
import { CreateEntityDialogComponent } from './presentation/dialogs/create-entity/create-entity.dialog.component';
import { EntityFacadeService } from './application/entity.facade.service';
import { ContextMenuService } from '../infrastructure/ui/context-menu/context-menu.service';
import { EntityService } from './core/entity.service';
import { toEntity } from './infrastructure/mapper/entity.mapper';
import { Point } from './interfaces/point.interface';

@Component({
  selector: 'app-map',
  imports: [
    TrxMap,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public entities: Signal<Entity[]> = computed(() => {
    return this.entity.entities().map((e) => toEntity(e));
  }); 

  constructor(
    public readonly  entity: EntityService,
    private readonly contextMenu: ContextMenuService,
    private readonly dialog: DialogService,
    private readonly facade: EntityFacadeService,
  ) {

  }

  public async openCreateEntityDialog(ev: {cursorPosition: Point, mapPosition: Point}) {
    const newEntity = await this.dialog.open(CreateEntityDialogComponent, ev);
    if (newEntity) {
      this.facade.createEntity(newEntity);
    }
  }

  public openNewContextMenu(ev: {cursorPosition: {x: number, y: number}, mapPosition: {x: number, y: number}}) {
    this.contextMenu.open({
      entries: [
        {
          label: "Create",
          action: async () => {
            this.openCreateEntityDialog(ev);
          },
        },
      ],
      position: { x: ev.cursorPosition.x, y: ev.cursorPosition.y },
    });
  }
}
