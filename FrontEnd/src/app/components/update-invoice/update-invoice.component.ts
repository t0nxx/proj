import { NotificationsServices } from './../../services/notifications.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicesServices } from '../../services/invoices.services';
import { ItemsTypesServices } from '../../services/itemsTypes.services';
import { ItemsServices } from '../../services/items.services';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  invoice;
  items;
  types;
  id;
  state;
  addItems = [];

  constructor(
    private route: ActivatedRoute,
    private mess: NotificationsServices,
    private invoiceServices: InvoicesServices,
    private typesServices: ItemsTypesServices,
    private itemsServices: ItemsServices
  ) {
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getTypes();
      this.getItems();
      if (this.id !== undefined) {
        this.state = "Edit";
        this.getIvoiceData(this.id);
      } else {
        this.state = "Add";
        this.invoice = {
          items: [],
          name: "",
          type_id: "",
          data_from: "",
          data_to: "",
          price: "",
          vat_percentage: 14,
          company_name: "",
          client_name: "",
          client_phone: "",
          po_number: "",
          accountant_lock: "",
          account_manager_lock: ""
        }
      }
    })
  }

  getIvoiceData(id) {
    this.invoiceServices.getInvoice(id).subscribe(data => {
      this.invoice = data[0];
    })
  }

  editInvoice(invoice) {
    this.invoiceServices.editInvoice(this.id, invoice).subscribe(res => {
      this.mess.showMessage("Success", "Edit invoice Done", "success");
    })
  }

  addNewInvoice(invoice) {
    console.log(invoice)
    this.invoiceServices.addNewInvoice(invoice).subscribe(res => {
      this.invoice = {
        items: [],
        name: "",
        type_id: "",
        data_from: "",
        data_to: "",
        price: "",
        vat_percentage: 14,
        company_name: "",
        client_name: "",
        client_phone: "",
        po_number: "",
        accountant_lock: "",
        account_manager_lock: ""
      }
      this.mess.showMessage("Success", "Add invoice Done", "success");
    });
  }

  getTypes() {
    this.typesServices.getAll().subscribe(data => {
      this.types = data;
    })
  }

  getItems() {
    let test = [
      { pitem_id: 1, ptype_name: "test1" },
      { pitem_id: 2, ptype_name: "test2" },
      { pitem_id: 3, ptype_name: "test3" },
      { pitem_id: 4, ptype_name: "test4" }
    ]
    this.items = test;
    // this.itemsServices.getAllItems().subscribe(data => {
    //   this.items = data;
    //   console.log(this.items);
    // })
  }

  addNewItemToInvoice(itemID) {
    console.log(itemID)
    let items = this.items;
    for (let index = 0; index < items.length; index++) {
      if (items[index].pitem_id == itemID) {
        let item = items[index];
        this.invoice.items.push({
          item_id: item.pitem_id,
          item_price: "",
          item_quantity: "",
          item_cost: "",
          item_name: item.ptype_name,
          item_description: item.item_description
        });
      }
    }
  }

  removeItemFromInvoice(item){
    let items = this.invoice.items;
    for (let index = 0; index < items.length; index++) {
      let oneitem = items[index];
      if (oneitem.pitem_id === item.pitem_id) {
        console.log(index);
        items.splice(index, 1);
      }
    }
    console.log(items);
  }


  ngOnInit() {
  }

}
