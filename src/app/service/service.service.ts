import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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

    delete(user: Service): Observable<Service> {
        return this.http.delete<Service>(this.apiEndpoint + user._id, httpOptions);
    }

    save(user: Service): Observable<Service> {
        return this.http.post<Service>(this.apiEndpoint, user, httpOptions);
    }

    edit(user: Service): Observable<Service> {
        return this.http.put<Service>(this.apiEndpoint + user._id, user, httpOptions);
    }

    getAll(paginator): Observable<Paginator<Service>> {
        return this.http.get<Paginator<Service>>(this.apiEndpoint, {params: paginator});
    }

    getService(id): Observable<Service> {
        return this.http.get<Service>(this.apiEndpoint + id);
    }

}