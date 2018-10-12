import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { CartSubmit } from '../interfaces/CartSubmit';

@Injectable({
  providedIn: 'root'
})
export class CartSubmitService {

  public cartSubmit: Observable<CartSubmit[]>;
  cartSubmitcollection: AngularFirestoreCollection<any> = this.db.collection('cartSubmit');

  constructor(private db: AngularFirestore,private afStorage: AngularFireStorage) { }



  getCartSubmit(): Observable<CartSubmit[]>{
    
    return this.cartSubmit = this.cartSubmitcollection.valueChanges();
      //this.db.collection('/items').valueChanges();
   
 }


 addCartSubmit(cartSubmit: CartSubmit) {
  //console.log(cartSubmit);
 return this.cartSubmitcollection.add({ ...cartSubmit
}).then((docRef) => {
    this.cartSubmitcollection.doc(docRef.id).update({
      id: docRef.id
    });
  }).catch((err) => {
    console.log(err);
  });
}

deleteCartSubmit(cartSubmit: CartSubmit){
  this.cartSubmitcollection.doc(cartSubmit.id).delete();

}

}
