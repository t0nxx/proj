import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NotificationsServices]
})
export class HomeComponent implements OnInit {

  msgs: Message[] = [];

  constructor(
    mess: NotificationsServices
  ) {
    // this.msgs = mess.showSuccess();
  }

  ngOnInit() {
  }

}
