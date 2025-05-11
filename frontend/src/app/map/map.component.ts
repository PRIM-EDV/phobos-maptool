import { Component } from '@angular/core';
import { TrxMap } from '@trx/map';
import { DialogService } from '../infrastructure/ui/dialog/dialog.service';
import { CreateEntityDialogComponent } from './presentation/dialogs/create-entity/create-entity.dialog.component';
import { EntityFacadeService } from './application/entity.facade.service';

@Component({
  selector: 'app-map',
  imports: [
    TrxMap,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  constructor(
    private readonly dialog: DialogService,
    private readonly facade: EntityFacadeService,
  ) {

  }

  public async openCreateEntityDialog(ev: MouseEvent) {
    const newEntity = await this.dialog.open(CreateEntityDialogComponent, {x: ev.clientX, y: ev.clientY});
    if (newEntity) {
      this.facade.createEntity(newEntity);
    }
  }
}
