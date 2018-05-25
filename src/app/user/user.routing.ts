import {Routes} from '@angular/router';
import {CanActivateTeam} from '../app.canActivateTeam';
import {UserComponent} from './user.component';
import {UserDetailComponent} from './detail/user.detail.component';

export const userRoutes: Routes = [
    { path: 'user', component: UserComponent, canActivate: [CanActivateTeam] },
    { path: 'user/:id', component: UserDetailComponent, canActivate: [CanActivateTeam] },
    { path: 'user/new', component: UserDetailComponent, canActivate: [CanActivateTeam] }
];
