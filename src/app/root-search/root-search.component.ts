import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-search',
  templateUrl: './root-search.component.html',
  styleUrls: ['./root-search.component.css']
})
export class RootSearchComponent implements OnInit {

  constructor( private fb: FormBuilder,
     private router: Router) { }

  searchForm: FormGroup;

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
    this.router.navigate(['/site/rootSearch/'+ itemstring]);
    //location.reload();
  }

}
