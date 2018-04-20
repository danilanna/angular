import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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

    async delete(user: Permission): Promise<Permission> {
        return await this.http.delete<Permission>(this.apiEndpoint + user._id, httpOptions).toPromise();
    }

    async save(user: Permission): Promise<Permission> {
        return await this.http.post<Permission>(this.apiEndpoint, user, httpOptions).toPromise();
    }

    async edit(user: Permission): Promise<Permission> {
        return await this.http.put<Permission>(this.apiEndpoint + user._id, user, httpOptions).toPromise();
    }

    async getAll(paginator): Promise<Paginator<Permission>> {
        return this.http.get<Paginator<Permission>>(this.apiEndpoint, {params: paginator}).toPromise();
    }

    async getAllNoPagination(): Promise<Permission[]> {
        return this.http.get<Permission[]>(this.apiEndpoint).toPromise();
    }

    async getPermission(id): Promise<Permission> {
        return await this.http.get<Permission>(this.apiEndpoint + id).toPromise();
    }
}