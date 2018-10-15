import { PermissionsServices } from './../../services/permissions.service';
import { NotificationsServices } from './../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationsServices } from '../../services/quotations.service';
import { ItemsTypesServices } from '../../services/itemsTypes.service';
import { ItemsServices } from '../../services/items.service';

@Component({
  selector: 'app-update-quotation',
  templateUrl: './update-quotation.component.html',
  styleUrls: ['./update-quotation.component.css']
})
export class UpdateQuotationComponent implements OnInit {

  quotation;
  items;
  types;
  id;
  state;
  addItems = [];
  itemId = "";
  currentUserType = this.permissionsServices.getCurrentUserType();
  currentUserId = this.permissionsServices.getCurrentUserId();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mess: NotificationsServices,
    private quotationServices: QuotationsServices,
    private typesServices: ItemsTypesServices,
    private itemsServices: ItemsServices,
    private permissionsServices: PermissionsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getTypes();
      this.getItems();
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getIvoiceData(this.id);
      } else {
        console.log(this.currentUserType);
        if (this.currentUserType === "account manager") {
          this.router.navigateByUrl('/');
        }
        this.state = "Add";
        this.quotation = {
          items: [],
          name: "",
          type_id: "",
          date_from: "",
          date_to: "",
          price: "",
          vat_percentage: 14,
          company_name: "",
          client_name: "",
          client_title: "",
          client_phone: "",
          po_number: "",
          accountant_lock: "",
          account_manager_lock: "",
          sub_total: 0,
          total: 0
        }
      }
    })
  }

  getIvoiceData(id) {
    this.quotationServices.getQuotation(id).subscribe(data => {
      this.quotation = data[0];
    })
  }

  editQuotation(quotation) {
    if (this.currentUserType === 'account manager') {
      quotation.account_manager_lock = true;
    }
    this.quotationServices.editQuotation(this.id, quotation).subscribe(res => {
      this.mess.showMessage("Success", "Edit quotation Done", "success");
    })
  }

  addNewQuotation(quotation) {
    // console.log(quotation)
    // if (this.currentUserType === 'accountant') {
    //   quotation.accountant_lock = true;
    //   quotation.account_manager_lock = false;
    // }else {
    //   quotation.accountant_lock = false;
    //   quotation.account_manager_lock = false;
    // }
    quotation.user_id = this.currentUserId;
    this.quotationServices.addNewQuotation(quotation).subscribe(res => {
      // console.log(res)
      // this.quotation = {
      //   items: [],
      //   name: "",
      //   type_id: "",
      //   date_from: "",
      //   date_to: "",
      //   price: "",
      //   vat_percentage: 14,
      //   company_name: "",
      //   client_name: "",
      //   client_phone: "",
      //   po_number: "",
      //   accountant_lock: "",
      //   account_manager_lock: ""
      // }
      this.mess.showMessage("Success", "Add quotation Done", "success");
    }, error => {
      console.log(error)
    });
  }

  getTypes() {
    this.typesServices.getAll().subscribe(data => {
      this.types = data;
    })
  }

  getItems() {
    this.itemsServices.getAllItems().subscribe(data => {
      this.items = data;
    })
  }

  addNewItemToQuotation(itemID) {
    let items = this.items;
    for (let index = 0; index < items.length; index++) {
      if (items[index].item_id == itemID) {
        let item = items[index];
        this.quotation.items.push({
          item_id: item.item_id,
          item_price: "",
          item_quantity: "",
          item_cost: "",
          item_name: item.item_name,
          item_description: item.item_description,
          quantity_type: "",
          item_totalcost: 0,
          item_totalprice: 0
        });
      }
    }
    this.itemId = "";
  }

  removeItemFromQuotation(item) {
    let items = this.quotation.items;
    for (let index = 0; index < items.length; index++) {
      let oneitem = items[index];
      if (oneitem.item_id === item.item_id) {
        items.splice(index, 1);
      }
    }
  }

  sumTotals(item) {
    // sum total price
    item.item_totalprice = item.item_price * item.item_quantity;
    // sum total cost
    item.item_totalcost = item.item_cost * item.item_quantity;
    // sum sub total && total
    let items = this.quotation.items;
    this.quotation.sub_total = 0;
    this.quotation.total = 0;
    for (let index = 0; index < items.length; index++) {
      this.quotation.sub_total += items[index].item_totalprice;
    }
    let vatAmoutn = ((this.quotation.sub_total * this.quotation.vat_percentage) / 100);
    this.quotation.total += this.quotation.sub_total - vatAmoutn;
  }


  ngOnInit() {
  }

}
