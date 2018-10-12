import { Injectable, OnInit } from '@angular/core';
import { cart } from '../interfaces/cart';

@Injectable()
export class GlobalsService{
  
  cartItem: cart
  cartCount: number = 0
  cartSum: number = 0
  reloaded: number = 0
  latitude: number = 0
  longitude: number = 0
  

  reset(){
    this.cartCount = 0;
    this.cartSum = 0;
    this.reloaded = 1
  }
/*   ngOnInit(): void {
    const initItem: Items = new Items
    const cartid = "";
    const items: Items[] = [initItem] ;
    const cartdate = Date.now();
    const purchased = 0;
    this.cartitem = {cartid, items , cartdate , purchased}
  } */

    /* initItem: Items = new Items
    cartid = "";
    items: Items[] = [this.initItem] ;
    cartdate = Date.now();
    purchased = 0; */
    //cartitem = {this.cartid, this.items , this.cartdate , this.purchased}
   // constructor(private  cartservice: CartServiceService) { }
   //cartservice: CartServiceService
  //cartitem: cart = new cart();
  //UID = ""
  //cartItems: number = 0;
  //itemsArray: Items[] = new Array();
  //items: Items[];
 

 /*  createCart(cartid: string, item: Items, cartdate: number,purchased: number){
    //this.cartitem.items.push(item);
    const initItem: Items = new Items
    const items: Items[] = [initItem] ;
    //var items = this.cartitem.items
    this.cartitem = {cartid, items , cartdate , purchased};
    console.log(this.cartitem)
    this.cartitem.items.push(item);
    this.cartservice.addcart(this.cartitem)
  } */

  
}
