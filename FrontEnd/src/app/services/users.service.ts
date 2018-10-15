import { MainServices } from './main.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  users : any[];
  types;
  
  constructor(
    private main: MainServices
  ){

  }

}