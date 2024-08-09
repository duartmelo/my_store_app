import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate() {
    const isAuth = sessionStorage.getItem("auth") === "true";
    if(!isAuth) {
      this.router.navigateByUrl('/login');
    }
    return isAuth;
  }

}

export const authguard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => new AuthGuard(new Router).canActivate();

