import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ShoppingListComponent } from '../shopping/list/list.component';
import { ItemListComponent } from '../item/list/list.component';
import { StoreListComponent } from '../store/list/list.component';
// import { HomePage } from '../home/home.page';
// import { AboutPage } from '../about/about.page';
// import { ContactPage } from '../contact/contact.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
		{
			path: '',
			redirectTo: '/tabs/(shopping:shopping)',
			pathMatch: 'full',
		},
		{
			path: 'shopping',
			outlet: 'shopping',
			component: ShoppingListComponent
		},
		{
			path: 'pantry',
			outlet: 'pantry',
			component: ItemListComponent
		},
		{
			path: 'stores',
			outlet: 'stores',
			component: StoreListComponent
		}
      // {
      //   path: '',
      //   redirectTo: '/tabs/(home:home)',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'home',
      //   outlet: 'home',
      //   component: HomePage
      // },
      // {
      //   path: 'about',
      //   outlet: 'about',
      //   component: AboutPage
      // },
      // {
      //   path: 'contact',
      //   outlet: 'contact',
      //   component: ContactPage
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(shopping:shopping)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
