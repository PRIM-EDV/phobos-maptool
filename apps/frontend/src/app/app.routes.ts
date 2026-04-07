import { Routes } from '@angular/router';
import { SquadComponent } from './squad/squad.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  {
    path: 'map', component: MapComponent,
    data: {
      roles: ['admin', 'tacop'],
      view: 'TACOP',
      tab: 'MAP'
    },
  },
  {
    path: 'squad', component: SquadComponent,
    data: {
      roles: ['admin', 'tacop'],
      view: 'TACOP',
      tab: 'SQUADS'
    },
  },
];
