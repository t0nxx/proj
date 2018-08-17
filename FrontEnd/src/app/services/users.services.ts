import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  users : any[];
  types;
  
  constructor(
    private db : AngularFireDatabase
  ){

  }

}