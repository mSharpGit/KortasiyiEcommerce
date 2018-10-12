import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

 public orders: Observable<any[]>;
  
  constructor(
   private db: AngularFirestore) { }
  
  getorders(): Observable<any[]>{
     return this.orders = this.db.collection('/orders').valueChanges();
  }
}
