import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemService } from './services/item.service';
import { ShoppingService } from './services/shopping.service';
import { StoreService } from './services/store.service';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule,
	CommonModule,
	IonicModule.forRoot(),
	AppRoutingModule,
	HttpClientModule,
	DragulaModule
  ],
  providers: [
	StatusBar,
	SplashScreen,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	{ provide: 'itemService', useClass: ItemService },
	{ provide: 'shoppingService', useClass: ShoppingService },
	{ provide: 'storeService', useClass: StoreService },
	{ provide: 'itemURL', useValue: 'http://localhost:5000/api/item' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
