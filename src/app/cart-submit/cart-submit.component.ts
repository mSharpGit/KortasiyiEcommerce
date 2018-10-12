import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from '../services/globals.service';
import { CartSubmit } from '../interfaces/CartSubmit';
import { CartSubmitService } from '../services/cart-submit.service';
@Component({
  selector: 'app-cart-submit',
  templateUrl: './cart-submit.component.html',
  styleUrls: ['./cart-submit.component.css']
})
export class CartSubmitComponent implements OnInit {

  cartForm: FormGroup;
  constructor(private fb: FormBuilder, private globals: GlobalsService, private cartSubmitService: CartSubmitService) { }
  lat: number
  lng: number
  errorMessage: string = '';
  fileEvent: any

  ngOnInit() {
    this.createForm();
    this.lat = this.globals.latitude
    this.lng = this.globals.longitude
  }

  createForm() {
    this.cartForm = this.fb.group({
      name: new FormControl("",  Validators.required ),
      surname: new FormControl("",  Validators.required ),
      age: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
         ]),
      phone: new FormControl("",  Validators.required ),
      email: new FormControl("",  Validators.required ),
      address: new FormControl("",  Validators.required )
    });
  }

  get name() { return this.cartForm.get('name'); }
  get surname() { return this.cartForm.get('surname'); }
  get age() { return this.cartForm.get('age'); }
  get phone() { return this.cartForm.get('phone'); }
  get email() { return this.cartForm.get('email'); }
  get address() { return this.cartForm.get('address'); }


  add(value) {
   //console.log(value)
    // stop here if form is invalid
    if (this.cartForm.invalid) {
      return;
    }
    this.createCartSubmit(value);
        }

createCartSubmit(value){
          const id = value.name;
          const name = value.name;
          const surname= value.surname;
          const age= value.age;
          const phone= value.phone;
          const email= value.email;
          const address= value.address;
          const latitude= this.globals.latitude;
          const longitude= this.globals.longitude;
          const cartid= this.globals.cartItem.thisCart.cartid;

           const cartSubmit: CartSubmit = { id, name, surname,
            age,
            phone,
            email,
            address,
            latitude,
            longitude,
            cartid
          };
                
                this.cartSubmitService.addCartSubmit(cartSubmit);
                this.showerror('Your Order has been submited we will contact you soon');
                //this.uploadflag = 0;
                this.cartForm.reset();
                //this.addForm.markAsUntouched();
               // this.createForm();
               // this.addForm.get('itemname').clearValidators;
                //this.addForm.setAsyncValidators([])
                //this.addForm.updateValueAndValidity()
                }

showerror(errormessage: string): void{
     this.errorMessage = errormessage;
    setTimeout( () => { this.errorMessage = '' }, 5000 );
                  
 }
}
