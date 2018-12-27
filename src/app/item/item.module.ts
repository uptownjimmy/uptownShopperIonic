import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemListComponent } from './list/list.component';
import { ItemDetailModal } from './detail/detail.modal';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShoppingItemOptionsPopover} from '../shopping/options/options.popover';

@NgModule({
	imports: [
		IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: ItemListComponent }])
	],
	declarations: [ItemListComponent, ItemDetailModal],
	entryComponents: [ItemDetailModal]
})
export class ItemModule {}
