import {Routes} from '@angular/router';
import {CanActivateTeam} from '../app.canActivateTeam';
import {PermissionComponent} from './permission.component';
import {PermissionDetailComponent} from './detail/permission.detail.component';

export const permissionRoutes: Routes = [
    { path: 'permission', component: PermissionComponent, canActivate: [CanActivateTeam] },
    { path: 'permission/:id', component: PermissionDetailComponent, canActivate: [CanActivateTeam] },
    { path: 'permission/new', component: PermissionDetailComponent, canActivate: [CanActivateTeam] },
];