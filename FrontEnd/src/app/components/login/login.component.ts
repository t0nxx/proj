import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
// import { moveIn } from '../router.animations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // animations: [moveTo()],
  // host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  err: any;

  constructor(
    private router: Router
  ) {}

  login(email, password) {
    localStorage.setItem('currentUser', JSON.stringify("s"));
  }

  ngOnInit() {
  }

}
