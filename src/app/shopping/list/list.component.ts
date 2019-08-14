import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {ItemDetailModal} from '../../item/detail/detail.modal';
import {Item} from '../../item/item.model';
import {ItemCategories} from '../../item/ItemCategory.model';
import {ReorderModalComponent} from '../../item/reorder/reorder.modal';
import {Store} from '../../store/store.model';
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
  public activeShoppingItems: Item[] = [];
  private stores = Store;
  private selectedStore = 'Filter by Store';

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
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
        this.activeShoppingItems = this.shoppingItems;
        // if (this.selectedStore !== 'Filter by Store') {
        //   this.filterByStore(this.selectedStore);
        // }
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

  async openItemOptions(event, item: Item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.name,
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            if (item) {
              item.active = false;
              this.itemService.updateExistingItem(item);
            }
          },
        },
        {
          text: 'Details',
          handler: () => {
            this.showItemDetails(item);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { },
        },
      ],
    });

    await actionSheet.present();
  }

  async showItemDetails(item: Item) {
    const modal = await this.modalController.create({
      component: ItemDetailModal,
      componentProps: {
        isNew: false,
        modalTitle:  'Edit Item',
        item,
      },
    });

    return await modal.present();
  }

  async openReorderModal() {
    const modal = await this.modalController.create({
      component: ReorderModalComponent,
      componentProps: {
        isNew: false,
        modalTitle: 'Reorder Items',
        // store,
      },
    });

    return await modal.present();
  }

  filterByStore(storeName) {
    this.selectedStore = storeName;
    // this.activeShoppingItems = this.shoppingItems.filter(item => item.store_Names.find(name => name === storeName));
  }
}
