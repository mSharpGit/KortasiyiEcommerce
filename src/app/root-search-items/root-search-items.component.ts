import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Items } from '../interfaces/items';

@Component({
  selector: 'app-root-search-items',
  templateUrl: './root-search-items.component.html',
  styleUrls: ['./root-search-items.component.css']
})
export class RootSearchItemsComponent implements OnInit {

  public items: Observable<Items[]>;
  query = '';
  navigationSubscription;

  constructor(public itemsService: ItemsService,
    private route: Router,
    private router: ActivatedRoute) {

      

      this.navigationSubscription = this.route.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
     }

getItems(){
  this.query =this.router.snapshot.paramMap.get('string');
  this.items = this.itemsService.searchItems(this.query);
  //.subscribe(items => this.items = items);
  //console.log(Date.now(), this.items.forEach.length);
}

  ngOnInit() {

  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    //location.reload();
    //console.log('hello')
    this.getItems();
  }

  ngOnDestroy() {
     // avoid memory leaks here by cleaning up after ourselves. If we  
     // don't then we will continue to run our initialiseInvites()   
     // method on every navigationEnd event.
     if (this.navigationSubscription) {  
        this.navigationSubscription.unsubscribe();
     }
 
    } 
}
