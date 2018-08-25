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
    })
  }

  editItemType(itemType) {
    if (itemType.ptype_name !== "") {
      this.main.PutRequest('prodtypes/' + itemType.ptype_id, itemType).subscribe(res => {
        this.mess.showMessage("Success", "Edit item Done", "success");
      })
    } else {
      this.mess.showMessage("Failed", "Type name can't ne empty", "error");
    }
  }

  addItemType(itemType) {
    if (itemType.ptype_name !== "") {
      this.main.PostRequest('prodtypes', itemType).subscribe(res => {
        this.type = {
          ptype_name: ""
        }
        this.mess.showMessage("Success", "Add item Type Done", "success");
      });
    } else {
      this.mess.showMessage("Failed", "Type name can't ne empty", "error");
    }
  }

  ngOnInit() {
  }

}
