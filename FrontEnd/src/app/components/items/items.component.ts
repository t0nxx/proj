import { MainServices } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items;

  constructor(
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.getAllItems();
  }

  getAllItems() {
    this.main.getRequest('items').subscribe(data => {
      this.items = data;
      // console.log(this.items)
    })
  }

  deleteItem(item_id){
    this.main.DeleteRequest('items/' + item_id).subscribe(res => {
      this.mess.showMessage("Success", "Delete item Done", "warn");
      this.getAllItems();
    });
  }

  ngOnInit() {
  }

}