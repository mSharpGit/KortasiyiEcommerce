import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../interfaces/items';
import { ItemsService } from '../services/items.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { cart } from '../interfaces/cart';
import { GlobalsService } from '../services/globals.service';
import { v4 as uuid } from 'uuid';
import { CartServiceService } from '../services/cart-service.service';
import { cartinterface } from '../interfaces/cartinterface';

@Component({
  selector: 'app-root-item',
  templateUrl: './root-item.component.html',
  styleUrls: ['./root-item.component.css']
})
export class RootItemComponent implements OnInit {

  createdCart: cart
  globalitem: Items[]


  @Input() items: Observable<Items[]>;

  

  constructor(
    private router: Router,
    private globals: GlobalsService,
    private cartservice: CartServiceService) {
  }

  ngOnInit() {
    //this.globals.itemsArray = new Array("");
  }

  rootItemDetail(item: Items){
    this.router.navigate(['/site/detail/'+item.itemid]);
}

addToCart(item: Items){
  //console.log(typeof this.globals.cartItem)
 
  if (typeof this.globals.cartItem == 'undefined' || this.globals.reloaded == 1) {
    const cartid = "";
    //console.log("first")
    //this.globals.pushI(item);
   // const items ;
    const cartdate = Date.now();
    const purchased = 0;
    const items: Items[] = [item] ;
    //const cartitem: cart = {cartid, items , cartdate , purchased};
    this.createdCart = new cart(cartid ,items ,cartdate , purchased, this.cartservice, 'create');
    this.globals.cartItem = this.createdCart;
    //console.log(this.globals.cartItem)
    //console.log(this.createdCart)
    this.globals.cartCount = this.globals.cartItem.getCount();
   //this.cartservice.addcart(cartitem)
   this.globals.reloaded = 0;
   
  //this.globals.UID = uuid();
  //console.log(this.globals.UID)
  //this.globals.popI();
  //this.globals.pushI(item)
  //console.log(this.globals.itemsArray)
  //this.globals.cartItems++;
  }else {
    //console.log("second")
    //const cartid = this.globals.cartItem.cartid;
    //console.log(this.globals.cartItem);
   this.globals.cartItem.pushItem(item);
   this.globals.cartCount = this.globals.cartItem.getCount();
    //const cartdate = Date.now();
    //const purchased = 0;
    //const cartupdate: cart = {cartid, items , cartdate , purchased};
      //this.cartservice.updatecart(cartupdate)
      //this.globals.cartItems++;
    //this.globals.pushI(item)
    //console.log(this.globals.itemsArray)
    //this.globals.cartItems++;
  }
  //this.createdCart = { this.UID , this.itmes , "",0 };
}
}
