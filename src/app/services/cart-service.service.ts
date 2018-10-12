import { Injectable } from '@angular/core';
import { cart } from '../interfaces/cart';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { GlobalsService } from './globals.service';
import { cartinterface } from '../interfaces/cartinterface';

@Injectable({
  providedIn: 'root'
})

export class CartServiceService {

  readonly path = 'cart';
  cartcollection: AngularFirestoreCollection<cartinterface> = this.db.collection(this.path);
  
  constructor(private db: AngularFirestore,private afStorage: AngularFireStorage,private globals: GlobalsService) { }

  addcart(cartitem: cartinterface){
    //console.log(item);
    //var returnvalue
   return this.cartcollection.add({ ...cartitem
}).then((docRef) => {
  //console.log(docRef.id);
   //returnvalue = docRef.id
   this.globals.cartItem.thisCart.cartid = docRef.id;
      this.cartcollection.doc(docRef.id).update({
        cartid: docRef.id
      });
    }).then( snapshot => {
      //console.log(this.image)
      //console.log(this.globals.cartItem.cartid);
      
      //return returnvalue
     })
    .catch((err) => {
      console.log(err);
    });
   // return returnvalue
  }

  updatecart(cartitem: cartinterface) {
    //console.log(cartitem.cartid);
   return this.cartcollection.doc(cartitem.cartid).update({ ...cartitem
    }).catch((err) => {
      console.log(err);
    });
  }

  getCart(id: string) {
    //console.log(id)
    return this.cartcollection.doc<cartinterface>(`/${id}`).ref.get();
  }

  deleteCart(id: string) {
    this.cartcollection.doc(id).delete();
  }
  
  
}
