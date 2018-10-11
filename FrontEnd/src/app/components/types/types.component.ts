import { ItemsTypesServices } from './../../services/itemsTypes.service';
import { Component } from '@angular/core';
import { NotificationsServices } from '../../services/notifications.service';

@Component({
    selector: 'types',
    templateUrl: './types.component.html'
})

export class TypesComponent {

    types;

    constructor(
        private itemsTypes: ItemsTypesServices,
        private mess: NotificationsServices
    ) {

        this.getAllItemsTypes();

    }

    getAllItemsTypes() {
        this.itemsTypes.getAll().subscribe(data => {
            this.types = data;
        })
    }

    deleteItemType(id) {
        this.itemsTypes.deleteType(id).subscribe(res => {
            this.mess.showMessage("Success", "Delete type Done", "warn");
            this.getAllItemsTypes();
        })
    }

}