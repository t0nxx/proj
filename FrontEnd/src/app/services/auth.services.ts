import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private af: AngularFireAuth,
  ){


    this.af.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigateByUrl('/login');
      }
    })


  }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
        return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/login');
    return false;
  }

}