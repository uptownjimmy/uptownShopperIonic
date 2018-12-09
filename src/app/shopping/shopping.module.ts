// form-list-item module
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ShoppingListComponent } from './list/list.component';

@NgModule({
	imports: [
		IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: ShoppingListComponent }])
	],
	declarations: [ShoppingListComponent]
})
export class ShoppingModule {}