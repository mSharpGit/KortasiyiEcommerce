import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrdersService } from '../services/orders.service';
import { CartSubmitService } from '../services/cart-submit.service';
import { CartSubmit } from '../interfaces/CartSubmit';
import { GlobalsService } from '../services/globals.service';
import { CartServiceService } from '../services/cart-service.service';
import { cartinterface } from '../interfaces/cartinterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkorders',
  templateUrl: './checkorders.component.html',
  styleUrls: ['./checkorders.component.css']
})
export class CheckordersComponent implements OnInit {

 // initial center position for the map
lat: number = 33.8892527;
lng: number = 35.4867727;

cart: cartinterface;

  public orders: Observable<CartSubmit[]>;

    constructor(private cartSubmit: CartSubmitService,
       private globals: GlobalsService, 
       private cartService: CartServiceService,
       public router: Router) {
        this.orders = cartSubmit.getCartSubmit();
    }


  ngOnInit() {
    //this.cart = this.cartService.getCart(this.orders[0].cartid)
  }

  goToCart(cartid){
    this.router.navigate(['/site/cart/' + cartid]);
   }

   deleteCart(cartSubmit: CartSubmit){
     this.cartSubmit.deleteCartSubmit(cartSubmit)
   }

}
