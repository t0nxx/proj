import { MainServices } from './main.services';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeServices {


    constructor(
        private main: MainServices
    ) {

    }

    getNumberOfItems(){
        return this.main.getRequest('items/count');
    }

    getNumberOfInvoices(){
        return this.main.getRequest('invoices/count');
    }

}