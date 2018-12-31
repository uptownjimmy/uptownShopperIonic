import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { Item } from '../../item/item.model';
import { ItemDetailModal } from '../../item/detail/detail.modal';

@Component({
    selector: 'us-shopping-item-options',
    templateUrl: './confirm.popover.html',
    styleUrls: ['./confirm.popover.css']
})
export class ShoppingItemOptionsPopover implements OnInit {
    @Input() item: Item;
	private loading = true;

    constructor(
        @Inject('itemService') private itemService,
		public popoverController: PopoverController,
		public modalController: ModalController
    ) {}

    ngOnInit() {
        this.loading = false;
    }

    private removeItemFromShoppingList() {
        console.log('Removing item from shopping list # ' + JSON.stringify(this.item));

        this.loading = true;

        if (this.item) {
            this.item.active = false;
            this.itemService.updateExistingItem(this.item);
        }

		this.popoverController.dismiss();
		this.loading = false;
    }

    private async showItemDetails() {
		this.popoverController.dismiss();

		const modal = await this.modalController.create({
			component: ItemDetailModal,
			componentProps: {
				isNew: false,
				modalTitle:  'Edit Item',
				item: this.item
			}
		});

		return await modal.present();
	}

	private closePopover() {
		this.popoverController.dismiss();
	}
}
