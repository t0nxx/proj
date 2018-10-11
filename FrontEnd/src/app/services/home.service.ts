import { MainServices } from './main.service';
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

    getNumberOfQuotations(){
        return this.main.getRequest('quotations/count');
    }

}