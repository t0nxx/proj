import { ItemsTypesServices } from './../../services/itemsTypes.services';
import { Component } from '@angular/core';

@Component({
    selector: 'types',
    templateUrl: './types.component.html'
})

export class TypesComponent {

    types;
    
    constructor(
        private itemsTypes: ItemsTypesServices
    ){

        this.getAllItemsTypes();

    }

    getAllItemsTypes(){
        this.itemsTypes.getAll().subscribe(data => {
            this.types = data;
        })
    }

    deleteItemType(id){
        this.itemsTypes.deleteType(id).subscribe(res => {
            console.log(res);
            this.getAllItemsTypes();
        })
    }

}