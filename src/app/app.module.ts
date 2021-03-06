import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemService } from './services/item.service';
import { ShoppingService } from './services/shopping.service';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [
  StatusBar,
  SplashScreen,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: 'itemService', useClass: ItemService },
  { provide: 'shoppingService', useClass: ShoppingService },
  { provide: 'storeService', useClass: StoreService },
  // { provide: 'itemURL', useValue: 'http://localhost:5000/api/item' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'https://localhost:5001/api/graphql' }),
      cache: new InMemoryCache(),
    });
  }
}
