import { PermissionsServices } from './../../services/permissions.services';
import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from './../../services/notifications.services';
import { InvoicesServices } from '../../services/invoices.services';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices;
  currentUserType = this.permissionsServices.getCurrentUserType();

  constructor(
    private mess: NotificationsServices,
    private invoicesServices: InvoicesServices,
    private permissionsServices: PermissionsServices
  ) {
    console.log(this.currentUserType)
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoicesServices.getAllInvoices().subscribe(data => {
      console.log(data)
      this.invoices = data;
    })
  }

  deleteInvoice(id) {
    this.invoicesServices.deleteInvoice(id).subscribe(res => {
      this.mess.showMessage("Success", "Delete invoice Done", "warn");
      this.getAllInvoices();
    });
  }
  ngOnInit() {
  }

}
