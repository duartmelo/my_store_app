import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_URL } from '@constants/url.constants';
import { LoginInterface } from '@interfaces/Login.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginInterface) {
    return this.httpClient.post(LOGIN_URL, {...credentials, expiresInMin: 10}, {headers: {"content-type": "application/json"}});
  }
}
