import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ItemListComponent } from './list/list.component';
import { ItemDetailModal } from './detail/detail.modal';

@NgModule({
	imports: [
		IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: ItemListComponent }])
	],
	declarations: [ItemListComponent, ItemDetailModal],
	entryComponents: [ItemDetailModal]
})
export class ItemModule {}
