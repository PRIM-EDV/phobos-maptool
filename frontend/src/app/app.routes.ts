import { Routes } from '@angular/router';
import { SquadComponent } from './squad/squad.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'squad' },
    { path: 'squad', component: SquadComponent },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    //   canActivate: [AuthGuard],
    //   data: {
    //     roles: ['admin', 'tec']
    //   }
    // }
  ];
