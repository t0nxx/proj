import { PermissionsServices } from "./../../services/permissions.service";
import { Component, OnInit } from "@angular/core";
import { NotificationsServices } from "./../../services/notifications.service";
import { QuotationsServices } from "../../services/quotations.service";

@Component({
  selector: "app-quotations",
  templateUrl: "./quotations.component.html",
  styleUrls: ["./quotations.component.css"]
})
export class QuotationsComponent implements OnInit {
  quotations;
  currentUserType = this.permissionsServices.getCurrentUserType();

  constructor(
    private mess: NotificationsServices,
    private quotationsServices: QuotationsServices,
    private permissionsServices: PermissionsServices
  ) {
    console.log(this.currentUserType);
    this.getAllQuotations();
  }

  getAllQuotations() {
    this.quotationsServices.getAllQuotations().subscribe(data => {
      console.log(data);
      this.quotations = data;
    });
  }

  deleteQuotation(id) {
    this.quotationsServices.deleteQuotation(id).subscribe(res => {
      this.mess.showMessage("Success", "Delete quotation Done", "warn");
      this.getAllQuotations();
    });
  }

  exportQuotation(quotation) {
    var url =
      this.quotationsServices.export() + "quotations/createpdf/" + quotation.serial;
    var win = window.open(url, "_blank");
    win.focus();
  }

  ngOnInit() { }
}
