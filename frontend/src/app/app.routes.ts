import { Routes } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'map' },
    { path: 'map', component: OverlayComponent },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    //   canActivate: [AuthGuard],
    //   data: {
    //     roles: ['admin', 'tec']
    //   }
    // }
  ];
