import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.css']
})
export class AdminportalComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
  public authService: AuthService,
  public itemService: ItemsService,
   // private location: Location
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      searchItems: ['']
    });
  }

  search(value){
    const itemstring = value.searchItems;
    this.router.navigate(['/adminPortal/search/'+ itemstring]);
  }

  
  
}
