import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { Items } from '../interfaces/items';
import { cart } from '../interfaces/cart';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { cartinterface } from '../interfaces/cartinterface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root-cart',
  templateUrl: './root-cart.component.html',
  styleUrls: ['./root-cart.component.css']
})
export class RootCartComponent implements OnInit {

cart : cart;
items: Items[];
cartid: string;
cartItems: cartinterface;
sum: number = 0;

  constructor(private route: ActivatedRoute,private globals: GlobalsService,
    private cartService: CartServiceService,
    private router: Router) { }

  ngOnInit() {
    
    //this.items = this.globals.itemsArray;
    //this.cartid = this.globals.UID;
    //console.log(this.items)
    //this.items = this.cart.items;
    this.getcart();
    //this.sum = this.globals.cartSum = this.globals.cartItem.calculateSum();
   /*  this.cart.cartid = this.globals.UID;
    this.cart.items = this.globals.itemsArray;
    this.cart.cartdate = Date.now();
    this.cart.purchased = 0;
 */

   //console.log(this.globals.calculateSum());
  }

  getcart(){
    const id = this.route.snapshot.paramMap.get('cartstring');
//console.log(this.globals.getCart(id))
//console.log(typeof this.globals.cartItem)
if (typeof this.globals.cartItem !== 'undefined') {
  //console.log('first')
  if(this.globals.cartItem.thisCart.cartid = id){
        this.cartItems = this.globals.cartItem.getCart(id)
      }else{
        var createdCart = new cart(this.cartItems.cartid ,this.cartItems.items ,this.cartItems.cartdate , this.cartItems.purchased, this.cartService, 'get');
        this.globals.cartItem = createdCart;
        let data
        this.cartService.getCart(id)
        .then ( snapshot => {
          data = snapshot.data();
          }).then( snapshot => {
            //console.log(data)
            this.cartItems = data
            //this.globals.cartItem.thisCart =  this.cartItems;
            //console.log(this.cartItems)
          }).then( snapshot => {
            var createdCart = new cart(this.cartItems.cartid ,this.cartItems.items ,this.cartItems.cartdate , this.cartItems.purchased, this.cartService, 'get');
            this.globals.cartItem = createdCart;
            this.globals.cartItem.thisCart = this.cartItems;
            this.globals.cartCount = this.globals.cartItem.getCount();
            this.globals.cartSum = this.globals.cartItem.calculateSum();
            this.sum = this.globals.cartSum = this.globals.cartItem.calculateSum();
            
          })
          .catch(error => {
          //handle the error
          console.log(error)
          }); 
      }
    }
    else{
      
      let data
    this.cartService.getCart(id)
    .then ( snapshot => {
      data = snapshot.data();
      }).then( snapshot => {
        //console.log(data)
        this.cartItems = data
        //this.globals.cartItem.thisCart =  this.cartItems;
        //console.log(this.cartItems)
      }).then( snapshot => {
        var createdCart = new cart(this.cartItems.cartid ,this.cartItems.items ,this.cartItems.cartdate , this.cartItems.purchased, this.cartService, 'get');
        
        this.globals.cartItem = createdCart;
        
        this.globals.cartItem.thisCart = this.cartItems;
        //console.log(this.globals.cartItem.thisCart)
        
      }).then( snapshot => {
        this.globals.cartCount = this.globals.cartItem.getCount();
        
        this.sum = this.globals.cartSum = this.globals.cartItem.calculateSum();
      })
      .catch(error => {
      //handle the error
      console.log(error)
      }); 
    }
  

    

    //console.log(id)
    /*let data
     this.cartService.getCart(id)
    .then ( snapshot => {
      data = snapshot.data();
       }).then( snapshot => {
        console.log(data)
        this.cartItems = data
      })
        .then ( snapshot => {
          this.globals.UID = this.cartItems.cartid;
           })
           .then ( snapshot => {
            //this.globals.cart = this.cartItems;
             })
           .then ( snapshot => {
            this.globals.cartItems = this.cartItems.items.length;
             })
             .then ( snapshot => {
             this.sum = this.globals.calculateSum(this.cartItems);
             })
      .catch(error => {
      //handle the error
      console.log(error)
      }); */
  }

  details(item: Items){
    console.log(item.itemid)
    this.router.navigate(['/site/detail/'+item.itemid]);
}



removeItem(item: Items) {
  //console.log(item);
  if (this.globals.cartItem.getCount() == 1){
    this.globals.cartItem.popItem(item);
    this.globals.cartCount = this.globals.cartItem.getCount();
    this.sum = this.globals.cartSum = this.globals.cartItem.calculateSum();
    this.globals.cartItem.deleteCart();
    this.globals.reset();
    this.goBack();
  }else{
    this.globals.cartItem.popItem(item);
    this.globals.cartCount = this.globals.cartItem.getCount();
    this.sum = this.globals.cartSum = this.globals.cartItem.calculateSum();
  }
}


goBack(): void {
  this.router.navigate(['/site/']);
  //this.location.back();
}

submitCart(): void{
  this.router.navigate(['/site/cartSubmit']);
}

}
