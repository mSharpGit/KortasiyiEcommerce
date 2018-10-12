import { Component, OnInit, Injectable } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent implements OnInit {

  

  constructor(public globals: GlobalsService,
  public router: Router) { }

  ngOnInit() {
    
  }

 goToCart(){
  this.router.navigate(['/site/cart/' + this.globals.cartItem.thisCart.cartid]);
 }

}
