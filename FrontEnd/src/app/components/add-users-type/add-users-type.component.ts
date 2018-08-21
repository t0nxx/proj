import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';
import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-users-type',
  templateUrl: './add-users-type.component.html',
  styleUrls: ['./add-users-type.component.css']
})
export class AddUsersTypeComponent implements OnInit {

  type;
  id;
  state;
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getTypeData(this.id);
      } else {
        this.state = "Add";
        this.type = {
          utype_name: "",
          utype_id: ""
        }
      }
    })
  }

  getTypeData(id) {
    this.main.getRequest('userstypes/' + id).subscribe(data => {
      this.type = data[0];
      console.log(this.type);
    })
  }

  editUserType(type) {
    this.main.PutRequest('userstypes/' + type.user_id, type).subscribe(res => {
      console.log(res);
      this.msgs = this.mess.showSuccess("Success", "Edit type Done", "success");
    })
  }

  addUserType(type) {
    this.main.PostRequest('userstypes', type).subscribe(res => {
      console.log(res);
      this.type = {
        utype_name: "",
        utype_id: ""
      }
      this.msgs = this.mess.showSuccess("Success", "Add type Done", "success");
    });
  }

  ngOnInit() {
  }

}
