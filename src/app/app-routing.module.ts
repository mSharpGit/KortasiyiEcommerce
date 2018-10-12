import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { AdditemsComponent } from './additems/additems.component';
import { CheckordersComponent } from './checkorders/checkorders.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SearchItemsComponent } from './search-items/search-items.component';
import { CollectionComponent } from './collection/collection.component';
import { RootItemDetailComponent } from './root-item-detail/root-item-detail.component';
import { SiteComponent } from './site/site.component';
import { RootSearchItemsComponent } from './root-search-items/root-search-items.component';
import { RootCartComponent } from './root-cart/root-cart.component';
import { CartSubmitComponent } from './cart-submit/cart-submit.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  {path: 'site', component: SiteComponent
   ,children: [
     {path: '', redirectTo: 'collection', pathMatch: 'full'},
     {path: 'collection', component: CollectionComponent},
     {path: 'detail/:id', component: RootItemDetailComponent},
     {path: 'rootSearch/:string', component: RootSearchItemsComponent },
     {path: 'rootSearch', component: CollectionComponent },
     {path: 'cart', component: CollectionComponent },
     {path: 'cart/:cartstring', component: RootCartComponent },
     {path: 'cartSubmit', component: CartSubmitComponent }]
    },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'adminPortal', component: AdminportalComponent, canActivateChild: [AuthGuard]
   ,children: [
      {path: '', redirectTo: 'itemsList', pathMatch: 'full'}, 
      {path: 'itemsList', component: ItemslistComponent},
      {path: 'additems', component: AdditemsComponent},
      {path: 'checkorders', component: CheckordersComponent},
      {path: 'itemDetail/:id', component: ItemDetailComponent },
      {path: 'search/:string', component: SearchItemsComponent },
      {path: 'search', component: ItemslistComponent }
  ], runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
