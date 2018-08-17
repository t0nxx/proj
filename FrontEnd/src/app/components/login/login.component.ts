import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
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
    private db: AngularFireDatabase,
    private af: AngularFireAuth,
    private router: Router
  ) {

    this.af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/');
      }
    })

  }

  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email, password).then((res) => {
      // console.log(res);
      localStorage.setItem('currentUser', JSON.stringify(res));
    },(err) => {
      err = this.err;
    });
  }

  ngOnInit() {
  }

}
