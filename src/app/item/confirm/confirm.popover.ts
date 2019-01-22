import {Component, OnInit, Input, Inject} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';

import {Item} from '../../item/item.model';

@Component({
	selector: 'us-confirm-delete-item',
	templateUrl: './confirm.popover.html',
	styleUrls: ['./confirm.popover.css']
})
export class ConfirmDeleteItemPopover implements OnInit {
	@Input() item: Item;
	private loading = true;

	constructor(
		@Inject('itemService') private itemService,
		public popoverController: PopoverController,
		public modalController: ModalController
	) {
	}

	ngOnInit() {
		this.loading = false;
	}

	private deleteItem() {
		console.log('Deleting item: ' + JSON.stringify(this.item));

		this.loading = true;

		if (this.item) {
			this.itemService.deleteItem(this.item);
		}

		this.popoverController.dismiss();
		this.modalController.dismiss();
		this.loading = false;
	}

	private closePopover() {
		this.popoverController.dismiss();
	}
}
