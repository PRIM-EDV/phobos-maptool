import {
  AfterViewInit,
  Component,
  computed,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Squad } from "@phobos-maptool/models";
import { SquadState } from "@phobos-maptool/models";

import { SquadService } from "./core/squad.service";
import { PhContextMenuComponent } from "../../../lib/ph-elements/ph-context-menu/ph-context-menu.component";
import { PhDropListComponent } from "../../../lib/ph-elements/ph-drop-list/ph-drop-list.component";
import { DialogService } from "../infrastructure/ui/dialog/dialog.service";
import { CreateSquadDialogComponent } from "./presentation/dialogs/create-squad/create-squad.dialog.component";
import { SquadFacadeService } from "./application/squad.facade.service";
import { ContextMenuService } from "../infrastructure/ui/context-menu/context-menu.service";

@Component({
  selector: "squad",
  standalone: false,
  templateUrl: "./squad.component.html",
  styleUrls: ["./squad.component.scss"],
})
export class SquadComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("existingContextMenu")
  existingContextMenu!: PhContextMenuComponent;
  @ViewChild("newContextMenu") newContextMenu!: PhContextMenuComponent;
  @ViewChildren(PhDropListComponent)
  dropListComponents!: QueryList<PhDropListComponent>;

  public SquadState = SquadState;

  public connectedLists: Array<PhDropListComponent> = [];

  public squadsUnstaged = this.filterSquads(SquadState.UNSTAGED);
  public squadsReady = this.filterSquads(SquadState.READY);
  public squadsQRFReady = this.filterSquads(SquadState.QRF_READY);
  public squadsInField = this.filterSquads(SquadState.IN_FIELD);

  private contextSquad!: Squad;

  constructor(
    public readonly squad: SquadService,
    public readonly facade: SquadFacadeService,
    private readonly dialog: DialogService,
    private readonly contextMenu: ContextMenuService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    for (const item of this.dropListComponents) {
      this.connectedLists.push(item);
    }
  }

  ngOnDestroy(): void {}

  // public deleteSquad() {
  //   this.squadService.deleteSquad(this.contextSquad);
  //   this.existingContextMenu.close();
  // }

  public openEditSquadContextMenu(ev: MouseEvent, squad: Squad) {
    ev.preventDefault();
    ev.stopPropagation();
    this.contextMenu.open({
      entries: [
        {
          label: "Edit",
          action: async () => {

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
    })
  }

  public openNewContextMenu(ev: MouseEvent, state: SquadState) {
    ev.preventDefault();
    this.contextSquad = {
      name: "",
      callsign: "",
      combattants: 0,
      state: state,
      position: 0,
    };
    // this.newContextMenu.open({ x: ev.clientX, y: ev.clientY });
  }

  public async openCreateSquadDialog(ev: MouseEvent) {
    const squad = await this.dialog.open(CreateSquadDialogComponent);
    if (squad) {
      this.facade.createSquad(squad);
    }
  }

  public handleDrop(event: { index: number; data: Squad }, state: SquadState) {
    const squad = { ...event.data, state: state, position: event.index };
    this.squad.setSquad(squad);
    console.log(this.squad.squads());
  }

  private filterSquads(state: SquadState) {
    return computed(() => {
      const squads = this.squad
        .squads()
        .filter((squad) => squad.state === state);
      return squads.sort((a, b) => a.position - b.position);
    });
  }
}
