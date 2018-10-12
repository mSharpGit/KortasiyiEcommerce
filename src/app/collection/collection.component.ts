import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from '../interfaces/items';
import { ItemsService } from '../services/items.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  
  public items: Observable<Items[]>;
  
  constructor(public itemsService: ItemsService,) { }

  ngOnInit() {
    this.items = this.itemsService.getitems();
  }

}
