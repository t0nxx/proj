import { PermissionsServices } from "./permissions.services";
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  currentUserType = this.permissionsServices.getCurrentUserType();

  constructor(
    private router: Router,
    private permissionsServices: PermissionsServices,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("currentUser")) {
      this.router.events.subscribe(res => {
        if(this.currentUserType === "Accountant" && res.url !== "/addInvoice"){
          return false;
        }
      });
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl("/login");
    return false;
  }

}
