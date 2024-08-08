import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products, ProductsResponse } from '@interfaces/Products.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from 'services/products/products.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ProductInfoComponent } from '@components/product-info/product-info.component';
import { HttpParams } from '@angular/common/http';
import { FilterComponent } from "../../components/filter/filter.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ProductInfoComponent, FilterComponent, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsSubscription = new Subscription();
  categoriesSubscription = new Subscription();
  productsByCategorySubscription = new Subscription();
  isLoading: boolean = true;
  hasError: boolean = false;
  hasMoreToLoad: boolean = false;

  productsResponse: ProductsResponse | undefined = undefined;
  products: Products[] = [];
  productCategories: Array<string> = [];
  category: string = "";
  skip: number = 0;
  limit: number = 12;

  params: HttpParams = new HttpParams({
    fromObject: {
      skip: this.skip,
      limit: this.limit,
      search: ""
    }
  })

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.productsService.getAllProducts(this.params).subscribe({
      next: response => this.setProducts(response),
      error: () => this.hasError = true,
      complete: () => this.isLoading = false,
    })
  }

  setProducts(response: ProductsResponse) {
    this.productsResponse = response;
    this.hasError = false;
    if (this.skip === 0) {
      this.products = response.products;
    } else {
      this.products.push(...response.products);
    }
    this.hasMoreToLoad = (this.skip + this.limit) < this.productsResponse.total;
  }

  getCategories() {
    this.isLoading = true;
    this.categoriesSubscription = this.productsService.getCategoryList().subscribe({
        next: response => this.productCategories = response,
        complete: () => this.isLoading = false,
      })
  }

  getProductsByCategory() {
    this.isLoading = true;
    this.productsByCategorySubscription = this.productsService.getProductByCategory(this.category, this.params).subscribe({
      next: response => this.setProducts(response),
      error: () => {
        this.hasError = true;
        this.category = "";
      },
      complete: () => this.isLoading = false
    })
  }

  filterByCategory(category: string) {
    this.resetPagination();
    this.category = category
    if (this.category) {
      this.getProductsByCategory();
    } else {
      this.getProducts();
    }
  }

  addParams(param: string, value: string) {
    if (this.params.has(param)) {
      this.params = this.params.set(param, value.toLowerCase());
    } else {
      this.params = this.params.append(param, value.toLowerCase());
    }
    this.resetPagination();
    this.getFilteredProducts();
  }

  resetPagination() {
    this.skip = 0;
    this.params = this.params.set("skip", this.skip);
  }

  loadMore() {
    this.skip = this.skip + this.limit;
    this.params = this.params.set("skip", this.skip);
    this.getFilteredProducts();
  }

  getFilteredProducts() {
    if (this.category) {
      this.filterByCategory(this.category);
    } else {
      this.getProducts();
    }
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.productsByCategorySubscription.unsubscribe();
  }
}
