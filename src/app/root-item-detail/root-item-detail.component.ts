import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../interfaces/items';
import { ItemsService } from '../services/items.service';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { GlobalsService } from '../services/globals.service';
import { cart } from '../interfaces/cart';

@Component({
  selector: 'app-root-item-detail',
  templateUrl: './root-item-detail.component.html',
  styleUrls: ['./root-item-detail.component.css']
})



export class RootItemDetailComponent implements OnInit {

  @Input() item: Items;

  globalitem: Items[]
  createdCart: cart
 
  constructor(private route: ActivatedRoute, private itemsService: ItemsService,
    private cartservice: CartServiceService,private globals: GlobalsService,) { }

  ngOnInit() {
    this.getItem();
   // console.log(this.globals.itemsArray)
  }


  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    
    let data
    this.itemsService.getItem(id)
    .then ( snapshot => {
      data = snapshot.data();
       }).then( snapshot => {
        this.item = data})
      .catch(error => {
      //handle the error
      console.log(error)
      });
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
