import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN, GET_USER, LOGIN } from '@constants/url.constants';
import { LoginInterface, LoginResponse, UserData } from '@interfaces/Login.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginInterface): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(DOMAIN + LOGIN, {...credentials, expiresInMin: 10}, {headers: {"content-type": "application/json"}});
  }

  getUserById(id: string): Observable<UserData> {
    return this.httpClient.get<UserData>(DOMAIN + GET_USER + id);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setUserId(id: number) {
    localStorage.setItem('userId', id.toString());
  }
}
