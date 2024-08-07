import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN, LOGIN } from '@constants/url.constants';
import { LoginInterface } from '@interfaces/Login.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginInterface): Observable<any> {
    return this.httpClient.post(DOMAIN+LOGIN, {...credentials, expiresInMin: 10}, {headers: {"content-type": "application/json"}});
  }
}
