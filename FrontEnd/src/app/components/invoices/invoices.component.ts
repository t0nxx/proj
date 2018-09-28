import { PermissionsServices } from "./../../services/permissions.services";
import { Component, OnInit } from "@angular/core";
import { NotificationsServices } from "./../../services/notifications.services";
import { InvoicesServices } from "../../services/invoices.services";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.css"]
})
export class InvoicesComponent implements OnInit {
  invoices;
  currentUserType = this.permissionsServices.getCurrentUserType();

  constructor(
    private mess: NotificationsServices,
    private invoicesServices: InvoicesServices,
    private permissionsServices: PermissionsServices
  ) {
    console.log(this.currentUserType);
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoicesServices.getAllInvoices().subscribe(data => {
      console.log(data);
      this.invoices = data;
    });
  }

  deleteInvoice(id) {
    this.invoicesServices.deleteInvoice(id).subscribe(res => {
      this.mess.showMessage("Success", "Delete invoice Done", "warn");
      this.getAllInvoices();
    });
  }

  exportInvoice(invoice) {
    // console.log(this.invoicesServices.export())
    var url =
      this.invoicesServices.export() + "invoices/createpdf/" + invoice.inv_id;
    var win = window.open(url, "_blank");
    win.focus();
    // this.invoicesServices.export(invoice.inv_id).subscribe(res => {
    //   console.log("res", res)
    //     res = new Blob([res.blob()], { type: "application/pdf" });
    //     var pdfUrl = URL.createObjectURL(res);
    //     var uri = 'data:text/pdf;charset=utf-8,' + escape(res);
    //     var linkpdf = document.createElement("a");
    //     linkpdf.href = pdfUrl;
    //     // linkpdf.style = "visibility:hidden";
    //     linkpdf.download = "x.pdf";
    //     document.body.appendChild(linkpdf);
    //     linkpdf.click();
    //     document.body.removeChild(linkpdf);
    //   }
    // );
  }

  ngOnInit() {}
}
