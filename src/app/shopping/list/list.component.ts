import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Item} from '../../item/item.model';
// import {AddItemsComponent} from '../add-shopping-items/add-shopping-items.component';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { ShoppingItemOptionsPopover } from '../options/options.popover';
import { Store } from '../../store/store.model';

@Component({
    selector: 'us-shopping-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    protected item_Types = [
        {
            id: 1,
            key_Text: 'Grocery'
        },
        {
            id: 2,
            key_Text: 'Hardware'
        },
        {
            id: 3,
            key_Text: 'Clothing'
        }
    ];
    public items: Item[] = [];
    public shoppingItems: Item[] = [];
    public filteredShoppingItems: Item[] = [];
    public stores: Store[];
    public selectedStore = 'Filter by Store';

    constructor(
		public popoverController : PopoverController,
        @Inject('itemService') public itemService,
		@Inject('shoppingService') public shoppingService,
		@Inject('storeService') public storeService,
    ) {
        this.itemService.getItems();
        this.subscription = this.itemService.itemListChanged.subscribe(
            (newItems: Item[]) => {
                this.items = newItems;
                this.shoppingItems = this.items.filter(
                    item => item.active === true
                );
                this.filteredShoppingItems = this.shoppingItems;
                if (this.selectedStore !== 'Filter by Store') {
                    this.filterByStore(this.selectedStore);
                }
            }
        );
    }

    ngOnInit() {
        this.stores = this.storeService.getStores();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // private addOrRemoveItems() {
    //     setTimeout(() => {
    //         const modalRef = this.modalService.open(AddItemsComponent, {
    //             size: 'lg',
    //             windowClass: 'add-shopping-items-popup'
    //         });
    //         modalRef.componentInstance.items = this.items;
    //         modalRef.componentInstance.shoppingItems = this.shoppingItems;
	//
    //         modalRef.result.then((result) => {
    //             this.filterByStore(this.selectedStore);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     });
    // }

	async openItemOptionsPopover(event, item) {
		const popover = await this.popoverController.create({
			component: ShoppingItemOptionsPopover,
			componentProps: { item: item },
			event: event,
		});

		return await popover.present();
	}

    private filterByStore(storeName) {
        this.selectedStore = storeName;
        // this.filteredShoppingItems = this.shoppingItems.filter(item => item.store_Names.find(name => name === storeName));
    }
}
