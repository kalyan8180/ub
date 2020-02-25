import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserExistService {
  ServerUrl = environment.baseUrl
  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) {

  }

  getAllUsers() {
    return this._http.get(this.ServerUrl + 'v1/user/getAll');
  }
  edit(userId, param) {
    return this._http.put(this.ServerUrl + 'v1/user/update/' + userId, param);
  }

  getUser(userId) {
    return this._http.put(this.ServerUrl + 'v1/user/deactivate/' + userId, {});



  }
  putUser(userId) {
    return this._http.put(this.ServerUrl + 'v1/user/activate/' + userId, {});
  }
}
