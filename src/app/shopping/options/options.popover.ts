import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { ItemDetailModal } from '../../item/detail/detail.modal';
import { Item } from '../../item/item.model';

@Component({
    selector: 'us-shopping-item-options',
    templateUrl: './options.popover.html',
    styleUrls: ['./options.popover.css'],
})
export class ShoppingItemOptionsPopover implements OnInit {
    @Input() item: Item;
  private loading = true;

  constructor(
      @Inject('itemService') private itemService,
      public popoverController: PopoverController,
      public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  removeItemFromShoppingList() {
    console.log('Removing item from shopping list # ' + JSON.stringify(this.item));

    this.loading = true;

    if (this.item) {
        this.item.active = false;
        this.itemService.updateExistingItem(this.item);
    }

    this.popoverController.dismiss();
    this.loading = false;
  }

  async showItemDetails() {
    this.popoverController.dismiss();

    const modal = await this.modalController.create({
      component: ItemDetailModal,
      componentProps: {
        isNew: false,
        modalTitle:  'Edit Item',
        item: this.item,
      },
    });

    return await modal.present();
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
