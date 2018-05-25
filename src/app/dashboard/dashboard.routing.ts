import {Routes} from '@angular/router';
import {CanActivateTeam} from '../app.canActivateTeam';
import {DashboardComponent} from './dashboard.component';

export const dashboardRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateTeam]}
];
