import { Routes } from '@angular/router';
import { authguard } from 'auth/authguard.guard';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.component").then(mod => mod.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then(mod => mod.LoginComponent),
  },
  {
    path: "products",
    loadComponent: () => import("./pages/products/products.component").then(mod => mod.ProductsComponent),
  },
  {
    path: "product-details/:id",
    loadComponent: () => import("./pages/product-details/product-details.component").then(mod => mod.ProductDetailsComponent),
  },
  {
    path: "cart",
    loadComponent: () => import("./pages/cart/cart.component").then(mod => mod.CartComponent),
  },
  {
    path: "checkout",
    loadComponent: () => import("./pages/checkout/checkout.component").then(mod => mod.CheckoutComponent),
    canActivate: [authguard],
  },
  {
    path: "success",
    loadComponent: () => import("./pages/page-successful/page-successful.component").then(mod => mod.PageSuccessfulComponent),
    canActivate: [authguard],
  }
];
