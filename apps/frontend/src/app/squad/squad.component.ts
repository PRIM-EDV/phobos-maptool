import { AfterViewInit, Component, computed, QueryList, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhButton, PhDropList, PhDropListItem } from "@phobos/elements";
import { Squad } from "@phobos-maptool/models";
import { SquadState } from "@phobos-maptool/models";

import { SquadService } from "./core/squad.service";
import { DialogService } from "../infrastructure/ui/dialog/dialog.service";
import { CreateSquadDialogComponent } from "./presentation/dialogs/create-squad/create-squad.dialog.component";
import { SquadFacadeService } from "./application/squad.facade.service";
import { ContextMenuService } from "../infrastructure/ui/context-menu/context-menu.service";
import { EditSquadDialogComponent } from "./presentation/dialogs/edit-squad/edit-squad.dialog.component";

@Component({
  selector: "squad",
  templateUrl: "./squad.component.html",
  styleUrls: ["./squad.component.scss"],
  imports: [CommonModule, PhButton, PhDropList, PhDropListItem],
})
export class SquadComponent implements AfterViewInit {
  @ViewChildren(PhDropList)
  dropListComponents!: QueryList<PhDropList>;

  public SquadState = SquadState;

  public connectedLists: Array<PhDropList> = [];

  public squadsUnstaged = this.filterSquads(SquadState.UNSTAGED);
  public squadsReady = this.filterSquads(SquadState.READY);
  public squadsQRFReady = this.filterSquads(SquadState.QRF_READY);
  public squadsInField = this.filterSquads(SquadState.IN_FIELD);

  constructor(
    public readonly squad: SquadService,
    public readonly facade: SquadFacadeService,
    private readonly dialog: DialogService,
    private readonly contextMenu: ContextMenuService
  ) {}

  ngAfterViewInit() {
    for (const item of this.dropListComponents) {
      this.connectedLists.push(item);
    }
  }

  public openEditSquadContextMenu(ev: MouseEvent, squad: Squad) {
    ev.preventDefault();
    ev.stopPropagation();
    this.contextMenu.open({
      entries: [
        {
          label: "Edit",
          action: async () => {
            this.openEditSquadDialog(ev, squad);
          },
        },
        {
          label: "Delete",
          action: async () => {
            this.facade.deleteSquad(squad);
          },
        },
      ],
      position: { x: ev.clientX, y: ev.clientY },
    });
  }

  public openNewSquadContextMenu(ev: MouseEvent, state: SquadState) {
    ev.preventDefault();
    ev.stopPropagation();
    this.contextMenu.open({
      entries: [
        {
          label: "Create",
          action: async () => {
            this.openCreateSquadDialog(ev, state);
          },
        },
      ],
      position: { x: ev.clientX, y: ev.clientY },
    });

  }

  public async openCreateSquadDialog(ev: MouseEvent, state: SquadState) {
    const newSquad = await this.dialog.open(CreateSquadDialogComponent);
    if (newSquad) {
      this.facade.createSquad({...newSquad, state});
    }
  }

  public async openEditSquadDialog(ev: MouseEvent, squad: Squad) {
    const editedSquad = await this.dialog.open(EditSquadDialogComponent, { squad: squad, position: { x: ev.clientX, y: ev.clientY } });
    if (editedSquad) {
      this.facade.updateSquad(editedSquad);
    }
  }

  public handleDrop(event: { index: number; data: Squad }, state: SquadState) {
    const squad = { ...event.data, state: state, position: event.index };
    this.facade.updateSquad(squad);
  }

  private filterSquads(state: SquadState) {
    return computed(() => {
      const squads = this.squad.squads().filter((squad) => squad.state === state);
      return squads.sort((a, b) => a.position - b.position);
    });
  }
}
