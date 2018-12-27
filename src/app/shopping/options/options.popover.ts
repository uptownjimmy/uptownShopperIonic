import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { Item } from '../../item/item.model';
import { ItemDetailModal } from '../../item/detail/detail.modal';

@Component({
    selector: 'us-shopping-item-options',
    templateUrl: './options.popover.html',
    styleUrls: ['./options.popover.css']
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
			// showBackdrop: true,
			componentProps: {
				isNew: false,
				modalTitle:  'Edit Item',
				item: this.item
			}
		});
		return await modal.present();

		//     setTimeout(() => {
    //         const modalRef = this.modalService.open(ItemDetailComponent);
    //         modalRef.componentInstance.isNew = false;
    //         modalRef.componentInstance.modalTitle = 'Edit Item';
    //         modalRef.componentInstance.item = this.item;
	//
    //         modalRef.result.then((result) => {
    //             console.log(result);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     });
	}

	private closePopover() {
		this.popoverController.dismiss();
	}
}
