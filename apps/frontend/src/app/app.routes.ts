import { Routes } from '@angular/router';
import { SquadComponent } from './squad/squad.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'squad' },
    { path: 'squad', component: SquadComponent },
    { path: 'map', component: MapComponent },
  ];
