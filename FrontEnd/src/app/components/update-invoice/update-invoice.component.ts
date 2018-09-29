import { PermissionsServices } from './../../services/permissions.services';
import { NotificationsServices } from './../../services/notifications.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemId = "";
  currentUserType = this.permissionsServices.getCurrentUserType();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mess: NotificationsServices,
    private invoiceServices: InvoicesServices,
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
        this.invoice = {
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
    this.invoiceServices.getInvoice(id).subscribe(data => {
      this.invoice = data[0];
    })
  }

  editInvoice(invoice) {
    if (this.currentUserType === 'account manager') {
      invoice.account_manager_lock = true;
    }
    this.invoiceServices.editInvoice(this.id, invoice).subscribe(res => {
      this.mess.showMessage("Success", "Edit invoice Done", "success");
    })
  }

  addNewInvoice(invoice) {
    // console.log(invoice)
    if (this.currentUserType === 'accountant') {
      invoice.accountant_lock = true;
      invoice.account_manager_lock = false;
    }else {
      invoice.accountant_lock = false;
      invoice.account_manager_lock = false;
    }
    this.invoiceServices.addNewInvoice(invoice).subscribe(res => {
      console.log(res)
      // this.invoice = {
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
      this.mess.showMessage("Success", "Add invoice Done", "success");
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

  addNewItemToInvoice(itemID) {
    let items = this.items;
    for (let index = 0; index < items.length; index++) {
      if (items[index].item_id == itemID) {
        let item = items[index];
        this.invoice.items.push({
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

  removeItemFromInvoice(item) {
    let items = this.invoice.items;
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
    let items = this.invoice.items;
    this.invoice.sub_total = 0;
    this.invoice.total = 0;
    for (let index = 0; index < items.length; index++) {
      this.invoice.sub_total += items[index].item_totalprice;
    }
    let vatAmoutn = ((this.invoice.sub_total * this.invoice.vat_percentage) / 100);
    this.invoice.total += this.invoice.sub_total - vatAmoutn;
  }


  ngOnInit() {
  }

}
