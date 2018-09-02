import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_name;
  password;
  
  constructor(
    private router: Router,
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  login() {
    this.main.PostRequest('login', {user_name: this.user_name, password: this.password}).subscribe(response => {
      console.log(response);
      this.mess.showMessage("Success", "Login Success", "success");
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.main.setHeaders(localStorage.getItem("currentUser"));
      this.router.navigateByUrl('/');
    }, err => {
      console.log(err.error);
      this.mess.showMessage("Error", err.error, "error");
    });
  }

  ngOnInit() {
  }

}
