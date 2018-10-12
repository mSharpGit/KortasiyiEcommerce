import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  searchForm: FormGroup;
 
  constructor( public itemService: ItemsService,
    // private location: Location
     private router: Router,
     private fb: FormBuilder,public authService: AuthService,) { 
    
     }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      searchItems: ['', Validators.required ]
    });}

    search(value){
      const itemstring = value.searchItems;
      this.router.navigate(['/adminPortal/search/'+ itemstring]);
      //location.reload();
    }

    logout(){
      this.authService.doLogout()
      .then((res) => {
        //this.location.back();
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });}
   
}
