import {Routes} from '@angular/router';
import {CanActivateTeam} from '../app.canActivateTeam';
import {ServiceComponent} from './service.component';
import {ServiceDetailComponent} from './detail/service.detail.component';

export const serviceRoutes: Routes = [
    { path: 'service', component: ServiceComponent, canActivate: [CanActivateTeam] },
    { path: 'service/:id', component: ServiceDetailComponent, canActivate: [CanActivateTeam] },
    { path: 'service/new', component: ServiceDetailComponent, canActivate: [CanActivateTeam] },
];