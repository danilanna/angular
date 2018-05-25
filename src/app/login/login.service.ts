import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    signin(login: Login): Observable<Login> {
        return this.http.post<Login>(this.apiEndpoint + 'authenticate', login, httpOptions);
    }

}