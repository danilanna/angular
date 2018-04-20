import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";


import { ToastrModule } from 'ngx-toastr';

import { CanActivateTeam } from './app.canActivateTeam';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';
import { PermissionService } from './permission/permission.service';
import { ServiceService } from './service/service.service';
import { AppRoutingModule } from './app-routing.module';
import { Interceptor } from './app.intercept';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/detail/user.detail.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionDetailComponent } from './permission/detail/permission.detail.component';
import { ServiceComponent } from './service/service.component';
import { ServiceDetailComponent } from './service/detail/service.detail.component';

import { Dialog } from './components/dialog/dialog.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatDialogModule, MatCheckboxModule, MatListModule, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, MatTableModule, MatIconModule, MatRadioModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UserComponent,
    UserDetailComponent,
    PermissionComponent,
    PermissionDetailComponent,
    Dialog,
    ServiceComponent,
    ServiceDetailComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  entryComponents: [Dialog],
  providers: [
    LoginService,
    UserService,
    PermissionService,
    ServiceService,
    CanActivateTeam,
    { 
      provide: APP_CONFIG, 
      useValue: APP_DI_CONFIG 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
