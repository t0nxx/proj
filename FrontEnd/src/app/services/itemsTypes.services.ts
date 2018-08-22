import { MainServices } from './main.services';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ItemsTypesServices {

    constructor(
        private main: MainServices
    ) {

    }

    getAll() {
        return this.main.getRequest('prodtypes');
    }

    deleteType(id){
        return this.main.DeleteRequest('prodtypes/' + id);
    }

}