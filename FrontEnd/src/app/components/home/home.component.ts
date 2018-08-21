import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NotificationsServices]
})
export class HomeComponent implements OnInit {


  constructor(
    private mess: NotificationsServices
  ) {
  }

  show(){
    this.mess.showMessage("Success", "Edit item Done", "success");
  }

  ngOnInit() {
  }

}
