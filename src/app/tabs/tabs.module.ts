import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ItemModule } from '../item/item.module';
import { ShoppingModule } from '../shopping/shopping.module';
import { StoreModule } from '../store/store.module';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.router.module';
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
  StoreModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
