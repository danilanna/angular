import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Paginator } from '../components/paginator/paginator.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PermissionService {

    private apiEndpoint;
    private id;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private http: HttpClient) {
        this.apiEndpoint = config.apiEndpoint + `permissions/`;
    }

    delete(user: Permission): Observable<Permission> {
        return this.http.delete<Permission>(this.apiEndpoint + user._id, httpOptions);
    }

    save(user: Permission): Observable<Permission> {
        return this.http.post<Permission>(this.apiEndpoint, user, httpOptions);
    }

    edit(user: Permission): Observable<Permission> {
        return this.http.put<Permission>(this.apiEndpoint + user._id, user, httpOptions);
    }

    getAll(paginator): Observable<Paginator<Permission>> {
        return this.http.get<Paginator<Permission>>(this.apiEndpoint, {params: paginator});
    }

    getAllNoPagination(): Observable<Permission[]> {
        return this.http.get<Permission[]>(this.apiEndpoint);
    }

    getPermission(id): Observable<Permission> {
        return this.http.get<Permission>(this.apiEndpoint + id);
    }
}