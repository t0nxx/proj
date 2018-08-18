import { element } from 'protractor';
import { MainServices } from './../../services/main.services';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];

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

  login(email, password) {
    let body = {
      email: email,
      password: password
    }
    this.main.PostRequest('users/login', body).subscribe(response => {
      console.log(response);
      this.msgs = this.mess.showSuccess("Success", "Login Success", "success");
      localStorage.setItem('currentUser', JSON.stringify(response));
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 2000);
    }, err => {
      console.log(err.error);
      this.msgs = this.mess.showSuccess("Error", err.error, "error");
    });
  }

  ngOnInit() {
  }

}
