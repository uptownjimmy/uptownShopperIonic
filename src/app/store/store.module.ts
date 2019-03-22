import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import { StoreDetailComponent } from './detail/detail.modal';
import { StoreListComponent } from './list/list.component';

@NgModule({
  imports: [
    IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: StoreListComponent }]),
  ],
  declarations: [StoreListComponent, StoreDetailComponent],
  // exports: [StoreListComponent, StoreDetailComponent]
})
export class StoreModule {}
