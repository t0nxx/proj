// import { Items } from './../../interfaces/items';
import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items;
  msgs: Message[] = [];

  constructor(
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.getAllItems();
  }

  getAllItems() {
    this.main.getRequest('items').subscribe(data => {
      this.items = data;
      console.log(this.items)
    })
  }

  deleteItem(item_id){
    this.main.DeleteRequest('items/' + item_id).subscribe(res => {
      console.log(res);
    });
    this.msgs = this.mess.showSuccess("Success", "Delete item Done", "warn");
    this.getAllItems();
  }

  ngOnInit() {
  }

}
