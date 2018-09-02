import { MainServices } from './main.services';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionsServices {

    currentUserType: string;
    currentUserName: string;

    constructor(
        private main: MainServices
    ) {
        this.getCurrentUserType()
    }

    getCurrentUserType() {
        if (localStorage.getItem("currentUser")) {
            this.currentUserType = JSON.parse(localStorage.getItem("currentUser")).utype_name.toLowerCase();
            return this.currentUserType;
        }
    }

    getCurrentUserName(){
        if (localStorage.getItem("currentUser")) {
            this.currentUserName = JSON.parse(localStorage.getItem("currentUser")).name;
            return this.currentUserName;
        }
    }

}