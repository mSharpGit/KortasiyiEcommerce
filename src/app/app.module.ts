import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth';


import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdditemsComponent } from './additems/additems.component';
import { CheckordersComponent } from './checkorders/checkorders.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchItemsComponent } from './search-items/search-items.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { RootSearchComponent } from './root-search/root-search.component';
import { RootFooterComponent } from './root-footer/root-footer.component';
import { RootItemDetailComponent } from './root-item-detail/root-item-detail.component';
import { RootItemComponent } from './root-item/root-item.component';
import { SiteComponent } from './site/site.component';
import { RootSearchItemsComponent } from './root-search-items/root-search-items.component';
import { GlobalsService } from './services/globals.service';
import { RootCartComponent } from './root-cart/root-cart.component';
import { CartSubmitComponent } from './cart-submit/cart-submit.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { MapviewComponent } from './mapview/mapview.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminportalComponent,
    ItemslistComponent,
    SidenavComponent,
    AdditemsComponent,
    CheckordersComponent,
    ItemDetailComponent,
    SearchItemsComponent,
    NavBarComponent,
    ItemComponent,
    CollectionComponent,
    RootNavComponent,
    RootSearchComponent,
    RootFooterComponent,
    RootItemDetailComponent,
    RootItemComponent,
    SiteComponent,
    RootSearchItemsComponent,
    RootCartComponent,
    CartSubmitComponent,
    GoogleMapsComponent,
    MapviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFpeLUl6SV9tuKiRVC0804Qn2khrW5dgw'
    })
    
  ],
  providers: [AuthService, UserService, AuthGuard, GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
