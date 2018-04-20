import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateTeam } from './app.canActivateTeam';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/detail/user.detail.component';

import { PermissionComponent } from './permission/permission.component';
import { PermissionDetailComponent } from './permission/detail/permission.detail.component';

import { ServiceComponent } from './service/service.component';
import { ServiceDetailComponent } from './service/detail/service.detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateTeam]},

  { path: 'user', component: UserComponent, canActivate: [CanActivateTeam] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [CanActivateTeam] },
  { path: 'user/new', component: UserDetailComponent, canActivate: [CanActivateTeam] },

  { path: 'permission', component: PermissionComponent, canActivate: [CanActivateTeam] },
  { path: 'permission/:id', component: PermissionDetailComponent, canActivate: [CanActivateTeam] },
  { path: 'permission/new', component: PermissionDetailComponent, canActivate: [CanActivateTeam] },

  { path: 'service', component: ServiceComponent, canActivate: [CanActivateTeam] },
  { path: 'service/:id', component: ServiceDetailComponent, canActivate: [CanActivateTeam] },
  { path: 'service/new', component: ServiceDetailComponent, canActivate: [CanActivateTeam] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
