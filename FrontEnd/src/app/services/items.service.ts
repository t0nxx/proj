import { MainServices } from './main.service';
import { Items } from './../interfaces/items';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsServices {
  
    items: Items;

  constructor(
      private http: HttpClient,
      private main: MainServices
  ){

  }

  getAllItems(){
    return this.main.getRequest('items');
  }

}