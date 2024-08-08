import { Routes } from '@angular/router';

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
  }
];
