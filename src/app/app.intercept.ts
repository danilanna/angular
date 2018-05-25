import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService){}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try {
      req = this.setAuthorizationHeader(req);
    
      return next.handle(req)
        .map((event: HttpEvent<any>) => {
          return event;
        })
        .catch((err: any, caught) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403 || err.status === 401) {
              this.toastr.error('Access', 'Looks like you do not have permission to do this action! Please contact the administrator.');
            }
            return Observable.throw(err);
          }
        });
    } catch(err) {
      this.redirectToSignin();
      return Observable.throw(err);
    }
  }

  private redirectToSignin() {
    this.toastr.error('Login', 'Please signin first.');
    this.router.navigate(['login']);
  }

  private setAuthorizationHeader(req: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if ( token && refreshToken ) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        req = req.clone({
            headers: req.headers.set('x-refresh-token', refreshToken)
        });
    }

    return req;
  }
}