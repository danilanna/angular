import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { ServiceDetailComponent } from './service/detail/service.detail.component';
import { userRoutes } from './user/user.routing';
import { serviceRoutes } from './service/service.routing';
import { permissionRoutes } from './permission/permission.routing';
import { loginRoutes } from './login/login.routing';
import { dashboardRoutes } from './dashboard/dashboard.routing';

const routes: Routes = [
  ...loginRoutes,
  ...dashboardRoutes,
  ...userRoutes,
  ...serviceRoutes,
  ...permissionRoutes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
