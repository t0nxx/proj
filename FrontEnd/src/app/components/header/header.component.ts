import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private af: AngularFireAuth,
    private router: Router
  ) { }

  logOut() {
    this.af.authState.subscribe(state => {
      console.log(state)
    });
    this.af.auth.signOut().then(function () {
      localStorage.removeItem('currentUser');
      console.log("sign out");
      this.router.navigateByUrl('/login');
    }.bind(this), function (err) {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
