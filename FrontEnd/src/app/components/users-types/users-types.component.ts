import { Component, OnInit, HostBinding } from '@angular/core';
import { MainServices } from '../../services/main.services';
import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-users-types',
  templateUrl: './users-types.component.html',
  styleUrls: ['./users-types.component.css']
})
export class UsersTypesComponent implements OnInit {

  usersTypes;
  msgs: Message[] = [];

  constructor(
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.getAllUsersTypes()
  }

  getAllUsersTypes() {
    this.main.getRequest('userstypes').subscribe(data => {
      this.usersTypes = data;
      console.log(this.usersTypes)
    });
  }

  deleteUserType(id) {
    this.main.DeleteRequest('userstypes/' + id).subscribe(res => {
      console.log(res);
      this.msgs = this.mess.showSuccess("Success", "Delete type Done", "warn");
    })
  }


  ngOnInit() {
  }

}
