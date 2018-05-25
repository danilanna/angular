import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    delete(user: User): Observable<User> {
        return this.http.delete<User>(this.apiEndpoint + user._id, httpOptions);
    }

    save(user: User): Observable<User> {
        return this.http.post<User>(this.apiEndpoint, user, httpOptions);
    }

    edit(user: User): Observable<User> {
        return this.http.put<User>(this.apiEndpoint + user._id, user, httpOptions);
    }

    getAll(paginator): Observable<Paginator<User>> {
        return this.http.get<Paginator<User>>(this.apiEndpoint, {params: paginator});
    }

    getUser(id): Observable<User> {
        return this.http.get<User>(this.apiEndpoint + id);
    }

}