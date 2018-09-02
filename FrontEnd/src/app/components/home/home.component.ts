import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.services';
import { HomeServices } from '../../services/home.services';
import { PermissionsServices } from '../../services/permissions.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NotificationsServices]
})
export class HomeComponent implements OnInit {

  username = this.user.getCurrentUserName();
  numberOfItems;
  numberOfInvoices;

  constructor(
    private mess: NotificationsServices,
    private home: HomeServices,
    private user: PermissionsServices
  ) {
    this.getNumItems();
    this.getNumInvoices();
  }

  getNumItems(){
    this.home.getNumberOfItems().subscribe(data => {
      this.numberOfItems = data;
      // console.log(this.numberOfItems)
    });
  }

  getNumInvoices(){
    this.home.getNumberOfInvoices().subscribe(data => {
      this.numberOfInvoices = data;
      // console.log(this.numberOfInvoices)
    });
  }

  ngOnInit() {
  }

}
