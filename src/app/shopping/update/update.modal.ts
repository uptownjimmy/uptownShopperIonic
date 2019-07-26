import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {QueryInfo} from 'apollo-client/core/QueryManager';
import {QueryItem} from '../../types';
import {Subscription} from 'rxjs';

@Component({
  selector: 'us-add-items',
  templateUrl: './update.modal.html',
  styleUrls: ['./update.modal.css'],
})
export class ShoppingListUpdateModal implements OnInit, OnDestroy {
  @Input() items: QueryItem[];
  private subscription: Subscription;

  private loading = false;
  private initialItems: QueryItem[];
  private updateItems: QueryItem[] = [];

  constructor(
    @Inject('itemService') private itemService,
    public modalController: ModalController,
  ) {
    this.itemService.getItemsSnapshot();
    this.subscription = this.itemService.itemListChanged.subscribe(
      (newItems: QueryItem[]) => {
        this.items = newItems;
      },
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onItemListClick(item: QueryItem) {
    const changedItem = this.initialItems.find((initialItem) =>
      initialItem.itemId === item.itemId && initialItem.active !== item.active,
    );

    if (changedItem) {
      this.updateItems.push(item);
    }
  }

  addToShoppingList() {
    this.loading = true;
    this.updateItems.forEach((item) => {
      this.itemService.updateExistingItem(item);
    });

    this.modalController.dismiss();
    this.loading = false;
  }
}
