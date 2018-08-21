import { Message } from 'primeng/components/common/api';
import { NotificationsServices } from './../../services/notifications.services';
import { MainServices } from './../../services/main.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-items-type',
  templateUrl: './add-items-type.component.html',
  styleUrls: ['./add-items-type.component.css']
})
export class AddItemsTypeComponent implements OnInit {

  type;
  id;
  state;
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private main: MainServices,
    private mess: NotificationsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getItemTypeData();
      } else {
        this.state = "Add";
        this.type = {
          ptype_name: ""
        }
      }
    })
  }

  getItemTypeData() {
    this.main.getRequest('prodtypes/' + this.id).subscribe(data => {
      this.type = data[0];
      // console.log(this.type);
    })
  }

  editItemType(itemType) {
    // console.log(itemType)
    this.main.PutRequest('prodtypes/' + itemType.ptype_id, itemType).subscribe(res => {
      // console.log(res);
      this.msgs = this.mess.showSuccess("Success", "Edit item Done", "success");
      // this.router.navigateByUrl('/items');
    })
  }

  addItemType(itemType) {
    this.main.PostRequest('prodtypes', itemType).subscribe(res => {
      // console.log(res);
      this.type = {
        ptype_name: ""
      }
      this.msgs = this.mess.showSuccess("Success", "Add item Type Done", "success");
    });
  }

  ngOnInit() {
  }

}
