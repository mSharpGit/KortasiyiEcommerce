import { Items } from '../interfaces/items';
import { Image } from '../interfaces/image';
import { ImageService } from '../services/image.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.css']
})
export class ItemslistComponent implements OnInit {
  
public items: Observable<Items[]>;
 
    constructor(public itemsService: ItemsService) {
        this.items = itemsService.getitems();
    }

  ngOnInit() {
  }

}
