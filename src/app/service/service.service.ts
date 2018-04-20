import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Service } from './service';
import { Paginator } from '../components/paginator/paginator.component';
import { APP_CONFIG, AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServiceService {

    private apiEndpoint;
    private id;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private http: HttpClient) {
        this.apiEndpoint = config.apiEndpoint + `services/`;
    }

    async delete(user: Service): Promise<Service> {
        return await this.http.delete<Service>(this.apiEndpoint + user._id, httpOptions).toPromise();
    }

    async save(user: Service): Promise<Service> {
        return await this.http.post<Service>(this.apiEndpoint, user, httpOptions).toPromise();
    }

    async edit(user: Service): Promise<Service> {
        return await this.http.put<Service>(this.apiEndpoint + user._id, user, httpOptions).toPromise();
    }

    async getAll(paginator): Promise<Paginator<Service>> {
        return this.http.get<Paginator<Service>>(this.apiEndpoint, {params: paginator}).toPromise();
    }

    async getService(id): Promise<Service> {
        return await this.http.get<Service>(this.apiEndpoint + id).toPromise();
    }

}