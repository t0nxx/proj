// import { UsersServices } from './../../services/users.services';
// import { Users } from './../../interfaces/users';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
// import { moveIn } from '../router.animations'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // animations: [moveTo()],
  // host: {'[@moveIn]': ''}
})
export class UsersComponent implements OnInit {

  users;
  types;

  constructor(
    private router: Router
  ) {

    this.getUsersList();

  }

  getUsersList() {
   
  }

  ngOnInit() {
  }

}
