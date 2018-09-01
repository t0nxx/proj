import { MainServices } from './main.services';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InvoicesServices {


    constructor(
        private main: MainServices
    ) {

    }

    getInvoice(id){
        return this.main.getRequest('invoices/' + id);
    }

    getAllInvoices() {
        return this.main.getRequest('invoices');
    }

    addNewInvoice(invoice) {
        return this.main.PostRequest('invoices', invoice);
    }

    editInvoice(id, invoice) {
        return this.main.PutRequest('invoices/' + id, invoice);
    }

    deleteInvoice(id){
        return this.main.DeleteRequest('invoices/' + id);
    }

}