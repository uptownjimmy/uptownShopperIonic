import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {QueryItem} from '../../types';
import {ItemDetailModal} from '../detail/detail.modal';
import {Item} from '../item.model';
import {ReorderModalComponent} from '../reorder/reorder.modal';

@Component({
  selector: 'us-item-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  public items: QueryItem[] = [];
  private subscription: Subscription;

  constructor(
    public modalController: ModalController,
    @Inject('itemService') public itemService,
  ) {
    this.itemService.getItems();
    this.subscription = this.itemService.itemListChanged.subscribe(
      (queryItems: QueryItem[]) => {
        this.items = queryItems;
        // chars = _.orderBy(newItems, 'name', 'asc');
        // this.items = _.orderBy(newItems, 'name', 'asc');
      },
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async openNewItem() {
    const modal = await this.modalController.create({
      component: ItemDetailModal,
      componentProps: {
        // isNew: false,
        modalTitle: 'New Item',
      },
    });

    return await modal.present();
  }

  private async itemListClick(item) {
    const modal = await this.modalController.create({
      component: ItemDetailModal,
      componentProps: {
        // isNew: false,
        modalTitle: 'Edit Item',
        item,
      },
    });

    return await modal.present();
  }

  // async openReorderModal() {
  //   const modal = await this.modalController.create({
  //     component: ReorderModalComponent,
  //     componentProps: {
  //       isNew: false,
  //       modalTitle: 'Reorder Items',
  //       // store,
  //     },
  //   });
  //
  //   return await modal.present();
  // }
}
