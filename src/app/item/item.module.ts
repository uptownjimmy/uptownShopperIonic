import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemListComponent } from './list/list.component';
import { ItemDetailModal } from './detail/detail.modal';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
	imports: [
		IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: ItemListComponent }])
	],
	declarations: [ItemListComponent, ItemDetailModal]
})
export class ItemModule {}
