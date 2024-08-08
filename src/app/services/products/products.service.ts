import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALL_PRODUCTS, DOMAIN, PRODUCT_CATEGORIES, PRODUCT_CATEGORY } from '@constants/url.constants';
import { ProductCategories, ProductsResponse } from '@interfaces/Products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}

  getAllProducts(params: HttpParams): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(DOMAIN + ALL_PRODUCTS, {params});
  }

  getProductByCategory(category: string, params: HttpParams): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(DOMAIN + PRODUCT_CATEGORY + category, {params});
  }

  getCategoryList(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(DOMAIN + PRODUCT_CATEGORIES);
  }
}
