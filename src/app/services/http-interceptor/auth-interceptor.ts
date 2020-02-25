import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    let authHeader = this.auth.getAuthToken();
    console.log(authHeader);
    let authReq = null;
    if(req.url && req.url.endsWith('signin') ) { 
        // Skip for signin
        authReq = req;
    } else {
        // Clone the request to add the new header.
        if (authHeader.indexOf('Bearer') != 0) {
          authHeader = 'Bearer ' + authHeader;
        }
        authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    }
    
    //
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}