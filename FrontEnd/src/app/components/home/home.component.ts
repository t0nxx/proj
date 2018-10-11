import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.service';
import { HomeServices } from '../../services/home.service';
import { PermissionsServices } from '../../services/permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NotificationsServices]
})
export class HomeComponent implements OnInit {

  username = this.user.getCurrentUserName();
  numberOfItems;
  numberOfQuotations;

  constructor(
    private mess: NotificationsServices,
    private home: HomeServices,
    private user: PermissionsServices
  ) {
    this.getNumItems();
    this.getNumQuotations();
  }

  getNumItems(){
    this.home.getNumberOfItems().subscribe(data => {
      this.numberOfItems = data;
      // console.log(this.numberOfItems)
    });
  }

  getNumQuotations(){
    this.home.getNumberOfQuotations().subscribe(data => {
      this.numberOfQuotations = data;
      // console.log(this.numberOfQuotations)
    });
  }

  ngOnInit() {
  }

}
