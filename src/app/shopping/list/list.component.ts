import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {Item} from '../../item/item.model';
import {ItemCategories} from '../../item/ItemCategory.model';
import {Store} from '../../store/store.model';
import {ShoppingItemOptionsPopover} from '../options/options.popover';
import {ShoppingListUpdateModal} from '../update/update.modal';

@Component({
  selector: 'us-shopping-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  // protected itemCategories = ItemCategories;
  private items: Item[] = [];
  private shoppingItems: Item[] = [];
  public filteredShoppingItems: Item[] = [];
  private stores = Store;
  private selectedStore = 'Filter by Store';

  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController,
    @Inject('itemService') public itemService,
    @Inject('shoppingService') public shoppingService,
    @Inject('storeService') public storeService,
  ) {
    this.itemService.getItems();
    this.subscription = this.itemService.itemListChanged.subscribe(
      (newItems: Item[]) => {
        this.items = newItems;
        this.shoppingItems = this.items.filter(
          (item) => item.active === true,
        );
        this.filteredShoppingItems = this.shoppingItems;
        if (this.selectedStore !== 'Filter by Store') {
          this.filterByStore(this.selectedStore);
        }
      },
    );
  }

  ngOnInit() {
    this.stores = this.storeService.getStores();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addOrRemoveItems() {
    const modal = await this.modalController.create({
      component: ShoppingListUpdateModal,
      componentProps: {
        items: this.items,
      },
    });

    return await modal.present();
  }

  async openItemOptionsPopover(event, item) {
    const popover = await this.popoverController.create({
      component: ShoppingItemOptionsPopover,
      componentProps: {item},
      event,
    });

    return await popover.present();
  }

  filterByStore(storeName) {
    this.selectedStore = storeName;
    // this.filteredShoppingItems = this.shoppingItems.filter(item => item.store_Names.find(name => name === storeName));
  }
}
