import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreListComponent } from './list/list.component';
import { StoreDetailComponent } from './detail/detail.modal';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
	imports: [
		IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: StoreListComponent }])
	],
	declarations: [StoreListComponent, StoreDetailComponent]
	// exports: [StoreListComponent, StoreDetailComponent]
})
export class StoreModule {}
