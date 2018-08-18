import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';
import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item;
  id;
  state;
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      // console.log(this.id, typeof this.id)
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getItemData();
      }else {
        this.state = "Add";
        this.item = {
          item_name: "",
          item_description: ""
        }
      }
    })
  }

  getItemData() {
    this.main.getRequest('items/' + this.id).subscribe(data => {
      this.item = data[0];
      console.log(this.item);
    })
  }

  editItem(item){
    this.main.PutRequest('items/' + item.item_id, item).subscribe(res => {
      console.log(res);
    })
    this.msgs = this.mess.showSuccess("Success", "Edit item Done", "success");
    // this.router.navigateByUrl('/items');
  }

  addItem(item){
    this.main.PostRequest('items', item).subscribe(res => {
      console.log(res);
    });
    this.item = {
      item_name: "",
      item_description: ""
    }
    this.msgs = this.mess.showSuccess("Success", "Add item Done", "success");
  }

  ngOnInit() {
  }

}
