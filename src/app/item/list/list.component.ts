import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';

import {Item} from '../item.model';
import {Subscription} from 'rxjs';
import {ItemDetailModal} from '../detail/detail.modal';

@Component({
	selector: 'us-item-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
	public items: Item[] = [];
	private subscription: Subscription;

	constructor(
		@Inject('itemService') public itemService,
		public modalController: ModalController,
		private dragulaService: DragulaService
	) {
		this.itemService.getItems();
		this.subscription = this.itemService.itemListChanged.subscribe(
			(newItems: Item[]) => {
				this.items = newItems;
			}
		);

		dragulaService.createGroup('Pantry', {
			// removeOnSpill: true
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private async openNewItem() {
		const modal = await this.modalController.create({
			component: ItemDetailModal,
			componentProps: {
				isNew: false,
				modalTitle: 'New Item'
			}
		});

		return await modal.present();
	}

	private async itemListClick(item) {
		const modal = await this.modalController.create({
			component: ItemDetailModal,
			componentProps: {
				isNew: false,
				modalTitle:  'Edit Item',
				item: item
			}
		});

		return await modal.present();
	}
}
