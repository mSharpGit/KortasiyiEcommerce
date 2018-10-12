import { Items } from "../interfaces/items";
import { CartServiceService } from "../services/cart-service.service";
import { cartinterface } from "./cartinterface";
import { GlobalsService } from "../services/globals.service";
export class cart {
  //cartid: string;
  //items: Items[];
  //cartdate: number;
  //purchased: number;
  thisCart: cartinterface
  cartservice: CartServiceService
  //(private  cartservice: CartServiceService) { }

  constructor(cartid: string, items: Items[], cartdate: number,purchased: number, cartservice: CartServiceService, option: string){
    this.cartservice = cartservice;
   // this.globalsService = globalsService;
    //this.cartitem.items.push(item);
    //const initItem: Items = new Items
    //const items: Items[] = [item] ;
    //var items = this.cartitem.items
    var cartitem
    cartitem = {cartid, items , cartdate , purchased};
    this.thisCart = cartitem
    //this.thisCart.items.push(item);
   // this.globalsService.cartItem = this.thisCart;
   if (option == 'create'){ this.cartservice.addcart(this.thisCart)}else
   if (option == 'get'){}
  }

  getCart(id : string): cartinterface{
    return this.thisCart;
  }



  popItem(item: Items){
    const index: number = this.thisCart.items.indexOf(item);
    if (index !== -1) {
    this.thisCart.items.splice(index, 1);
    }  
    this.cartservice.updatecart(this.thisCart);
  }

  pushItem( item: Items){
    //console.log(item)
    //console.log(this.thisCart)
     this.thisCart.items.push(item);
     this.cartservice.updatecart(this.thisCart);
  }


 calculateSum(): number{
    var Price: number = 0;
    
    for (let price of this.thisCart.items) {
     Price = Price + Number(price.itemprice) ; // 1, "string", false
    
  }
  
  return Price;
} 

getCount(): number{
  //console.log(this.thisCart.items)
return this.thisCart.items.length;
} 

getId(): string{
  return this.thisCart.cartid;
  } 

  updateId(id: string){
  this.thisCart.cartid = id;
    } 

deleteCart(){
  this.cartservice.deleteCart(this.thisCart.cartid);
}

}
