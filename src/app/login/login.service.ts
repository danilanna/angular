import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Login } from './login';
import { APP_CONFIG, AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

    private apiEndpoint;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private http: HttpClient) {
        this.apiEndpoint = config.apiEndpoint;
    }

    async signin(login: Login): Promise<Login> {
        return await this.http.post<Login>(this.apiEndpoint + 'authenticate', login, httpOptions).toPromise();
    }

}