import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALL_PRODUCTS, DOMAIN } from '@constants/url.constants';
import { ProductsResponse } from '@interfaces/Products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}

  getAllProducts(skip = 0, limit = 10, search = ''): Observable<ProductsResponse> {
    const params = {
      skip,
      limit,
      search
    }
    return this.httpClient.get<ProductsResponse>(DOMAIN + ALL_PRODUCTS, {params: params});
  }
}
