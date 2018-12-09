import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { ShoppingModule } from '../shopping/shopping.module';
import { StoreModule } from '../store/store.module';
import { ItemModule } from '../item/item.module';
// import { ContactPageModule } from '../contact/contact.module';
// import { AboutPageModule } from '../about/about.module';
// import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
	IonicModule,
	CommonModule,
	FormsModule,
	TabsPageRoutingModule,
	ShoppingModule,
	ItemModule,
	StoreModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
