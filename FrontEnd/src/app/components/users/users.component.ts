// import { UsersServices } from './../../services/users.services';
// import { Users } from './../../interfaces/users';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
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
    private db: AngularFireDatabase,
    private af: AngularFireAuth,
    private router: Router
  ) {

    this.getUsersList();

  }

  getUsersList() {
    this.db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
      this.db.list('/users_types').valueChanges().subscribe(types => {
        this.types = types;
        for (let indX = 0; indX < this.users.length; indX++) {
          for (let typeIdx = 0; typeIdx < this.types.length; typeIdx++) {
            if (this.users[indX].type_id == this.types[typeIdx].type_id) {
              this.users[indX].type_name = this.types[typeIdx].type_name;
            }
          }
        }
      })
    })
  }

  ngOnInit() {
  }

}
