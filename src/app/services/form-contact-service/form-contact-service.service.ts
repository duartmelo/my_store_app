import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCESS_KEY, FORM_SUBMIT_URL } from '@constants/url.constants';
import { ContactUsFormData, ContactUsResponse } from '@interfaces/Contact-Form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormContactService {

  constructor(private httpClient: HttpClient) { }

  sendContactFormData(userData: ContactUsFormData): Observable<ContactUsResponse>{
    return this.httpClient.post<ContactUsResponse>(FORM_SUBMIT_URL, {...userData, access_key: ACCESS_KEY})
  }
}
