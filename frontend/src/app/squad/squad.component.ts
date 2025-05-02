import { AfterViewInit, Component, computed, effect, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Squad } from '@phobos-maptool/models';
import { SquadState } from '@phobos-maptool/models';

import { SquadService } from './core/squad.service';
import { PhContextMenuComponent } from '../../../lib/ph-elements/ph-context-menu/ph-context-menu.component';
import { PhDropListComponent } from '../../../lib/ph-elements/ph-drop-list/ph-drop-list.component';

@Component({
  selector: 'squad',
  standalone: false,
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild(CreatePopupComponent) createPopup!: CreatePopupComponent;
  @ViewChild("existingContextMenu") existingContextMenu!: PhContextMenuComponent;
  @ViewChild("newContextMenu") newContextMenu!: PhContextMenuComponent;
  @ViewChildren(PhDropListComponent) dropListComponents!: QueryList<PhDropListComponent>;

  public SquadState = SquadState;

  public connectedLists: Array<PhDropListComponent> = [];

  public squadsUnstaged = this.filterSquads(SquadState.UNSTAGED);
  public squadsReady = this.filterSquads(SquadState.READY);
  public squadsQRFReady = this.filterSquads(SquadState.QRF_READY);
  public squadsInField = this.filterSquads(SquadState.IN_FIELD);

  private contextSquad!: Squad ;

  constructor(
    public readonly squadService: SquadService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    for(const item of this.dropListComponents) {
        this.connectedLists.push(item);
    }
    // this.existingContextMenu.close();
    // this.newContextMenu.close();

  }

  ngOnDestroy(): void {

  }

  public async createSquad(squad: Squad) {
    // this.handleSetSquad(squad);
    await this.squadService.setSquad(squad);
  }

  public deleteSquad() {
    this.squadService.deleteSquad(this.contextSquad);
    this.existingContextMenu.close();
  }

  public openEditContextMenu(ev: MouseEvent, squad: Squad) {
    ev.preventDefault();
    ev.stopPropagation();
    this.contextSquad = squad;
    this.existingContextMenu.open({x: ev.clientX, y: ev.clientY});
  }

  public openNewContextMenu(ev: MouseEvent, state: SquadState) {
    ev.preventDefault();
    this.contextSquad = {name: "", callsign: "", combattants: 0, state: state, position: 0};;
    this.newContextMenu.open({x: ev.clientX, y: ev.clientY});
  }

  public openSquadCreatePopup(ev: MouseEvent) {
    const position ={x: window.innerWidth / 2 - 330, y: window.innerHeight / 2 - 70};
    // this.createPopup.open(position);
    // this.createPopup.squad = {name: this.contextSquad.name, callsign: this.contextSquad.callsign, combattants: this.contextSquad.combattants, state: this.contextSquad.state, position: 0};
  }

  handleDrop(event: {index: number, data: Squad}, state: SquadState) {
    const squad = {...event.data, state: state, position: event.index};

    this.squadService.setSquad(squad);
    console.log(this.squadService.squads());
  }

  private filterSquads(state: SquadState) {
    return computed(() => {
      const squads = this.squadService.squads().filter((squad) => squad.state === state);
      return squads.sort((a, b) => a.position - b.position);
    })
  }
}
