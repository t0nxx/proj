import { NotificationsServices } from './../../services/notifications.service';
import { MainServices } from './../../services/main.service';
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
    })
  }

  editUserType(type) {
    this.main.PutRequest('userstypes/' + type._id, type).subscribe(res => {
      this.mess.showMessage("Success", "Edit type Done", "success");
    })
  }

  addUserType(type) {
    this.main.PostRequest('userstypes', type).subscribe(res => {
      this.type = {
        utype_name: "",
        utype_id: ""
      }
      this.mess.showMessage("Success", "Add type Done", "success");
    });
  }

  ngOnInit() {
  }

}
