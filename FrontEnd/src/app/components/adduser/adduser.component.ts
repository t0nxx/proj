import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';
import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user;
  types;
  id;
  state;
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      // console.log(this.id, typeof this.id, Number(this.id), typeof Number(this.id))
      this.getUsersTypes();
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getUserData(this.id);
      } else if (this.id === undefined) {
        this.state = "Add";
        this.user = {
          name: "",
          user_name: "",
          email: "",
          utype_id: "",
          password: "",
          confirm: ""
        }
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  getUserData(id) {
    this.main.getRequest('users/' + id).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })
  }

  editUser(user) {
    if (user.password === user.confirm) {
      this.main.PutRequest('users/' + this.id, user).subscribe(res => {
        console.log(res);
        this.mess.showMessage("Success", "Edit user Done", "success");
      })
    } else {
      this.mess.showMessage("Error", "Password and confirm password should be the same", "error");
    }
  }

  addAndUpdateUser(user) {
    if (user.password === user.confirm) {
      delete user["confirm"];
      this.main.PostRequest('users', user).subscribe(res => {
        console.log(res);
        this.user = {
          name: "",
          user_name: "",
          email: "",
          utype_id: "",
          password: "",
          confirm: ""
        }
        this.mess.showMessage("Success", "Add user Done", "success");
      }, err => {
        console.log(err)
        this.mess.showMessage("Success", err.error, "error");
      });
    } else {
      this.mess.showMessage("Error", "Password and confirm password should be the same", "error");
    }
  }

  getUsersTypes() {
    this.main.getRequest('userstypes').subscribe(data => {
      this.types = data;
      console.log(data)
    })
  }

  ngOnInit() {
  }

}
