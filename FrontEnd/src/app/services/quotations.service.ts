import { MainServices } from "./main.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class QuotationsServices {
  constructor(private main: MainServices) {}

  getQuotation(id) {
    return this.main.getRequest("quotations/" + id);
  }

  getAllQuotations() {
    return this.main.getRequest("quotations");
  }

  addNewQuotation(quotation) {
    return this.main.PostRequest("quotations", quotation);
  }

  editQuotation(id, quotation) {
    return this.main.PutRequest("quotations/" + id, quotation);
  }

  deleteQuotation(id) {
    return this.main.DeleteRequest("quotations/" + id);
  }

  export() :any {
    return this.main.getPdfResponse();
  }
}
