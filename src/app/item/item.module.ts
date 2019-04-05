import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {ConfirmDeleteItemPopover} from './confirm/confirm.popover';
import {ItemDetailModal} from './detail/detail.modal';
import {ReorderModalComponent} from './reorder/reorder.modal';
import {ItemListComponent} from './list/list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ItemListComponent}]),
  ],
  declarations: [ItemListComponent, ItemDetailModal, ReorderModalComponent, ConfirmDeleteItemPopover],
  entryComponents: [ItemDetailModal, ReorderModalComponent, ConfirmDeleteItemPopover],
})
export class ItemModule {}
