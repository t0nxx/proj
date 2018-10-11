import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationsServices]
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
