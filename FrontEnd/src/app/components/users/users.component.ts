import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MainServices } from '../../services/main.services';
import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private main: MainServices,
    private mess: NotificationsServices
  ) {

    this.getAllUsers()

  }

  getAllUsers() {
    this.main.getRequest('users').subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }

  deleteUser(id){
    this.main.DeleteRequest('users/' + id).subscribe(res => {
      console.log(res);
      this.msgs = this.mess.showSuccess("Success", "Delete user Done", "warn");
    })
  }

  ngOnInit() {
  }

}
