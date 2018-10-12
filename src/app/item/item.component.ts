import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../interfaces/items';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
@Input() item: Items

searchForm: FormGroup;

  constructor(
    public itemsService: ItemsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      searchItems: ['', Validators.required ]
    });
  }

  itemDetail(item: Items){
    this.router.navigate(['/adminPortal/itemDetail/'+item.itemid]);
}

  delete(item: Items) {
   this.itemsService.deleteItem(item.itemid, item.itemimage.imagePath);
 }
}
