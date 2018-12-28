import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Item } from '../../item/item.model';

@Component({
    selector: 'us-add-items',
    templateUrl: './update.modal.html',
    styleUrls: ['./update.modal.css']
})
export class ShoppingListUpdateModal implements OnInit {
    @Input() items: Item[];

    private loading = false;
    private initialItems: Item[];
    private updateItems: Item[] = [];

    constructor(
        @Inject('itemService') private itemService,
		public modalController: ModalController
	) {
        this.itemService.getItemsSnapshot().subscribe(
            (response: Item[]) => {
                this.initialItems = response;
            }
        );
    }

    ngOnInit() {}

    private onItemListClick(item: Item) {
        const changedItem = this.initialItems.find(
            initialItem => {
                return initialItem.id === item.id && initialItem.active !== item.active;
            }
        );

        if (changedItem) {
            this.updateItems.push(item);
        }
    }

    private addToShoppingList() {
        this.loading = true;
        this.updateItems.forEach(item => {
            this.itemService.updateExistingItem(item);
        });

		this.modalController.dismiss();
		this.loading = false;
    }
}
