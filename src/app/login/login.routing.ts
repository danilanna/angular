import {Routes} from '@angular/router';
import {LoginComponent} from './login.component';

export const loginRoutes: Routes = [
    { path: '', pathMatch: 'prefix', redirectTo: 'login' },
    { path: 'login', component: LoginComponent }
];
