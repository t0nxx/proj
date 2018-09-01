import { PermissionsServices } from './../../services/permissions.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUserType = this.permissionsServices.getCurrentUserType();
  
  constructor(
    private router: Router,
    private permissionsServices: PermissionsServices
  ) { }

  logOut() {
    localStorage.removeItem('currentUser');
    console.log("sign out");
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
