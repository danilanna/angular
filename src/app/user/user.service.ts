import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { Paginator } from '../components/paginator/paginator.component';
import { APP_CONFIG, AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private apiEndpoint;
    private id;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private http: HttpClient) {
        this.apiEndpoint = config.apiEndpoint + `users/`;
    }

    async delete(user: User): Promise<User> {
        return await this.http.delete<User>(this.apiEndpoint + user._id, httpOptions).toPromise();
    }

    async save(user: User): Promise<User> {
        return await this.http.post<User>(this.apiEndpoint, user, httpOptions).toPromise();
    }

    async edit(user: User): Promise<User> {
        return await this.http.put<User>(this.apiEndpoint + user._id, user, httpOptions).toPromise();
    }

    async getAll(paginator): Promise<Paginator<User>> {
        return this.http.get<Paginator<User>>(this.apiEndpoint, {params: paginator}).toPromise();
    }

    async getUser(id): Promise<User> {
        return await this.http.get<User>(this.apiEndpoint + id).toPromise();
    }

}