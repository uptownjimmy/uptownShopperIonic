import {Component, OnInit, Input, Inject, AfterViewInit} from '@angular/core';
// import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../../item/item.model';
// import {ItemDetailComponent} from '../../item/item-detail/item-detail.component';

@Component({
    selector: 'us-shopping-item-options',
    templateUrl: './options.modal.html',
    styleUrls: ['./options.modal.css']
})
export class ShoppingItemOptionsModal implements OnInit {
    @Input() item: Item;
    public loading = true;

    constructor(
        // public activeModal: NgbActiveModal,
        @Inject('itemService') private itemService,
        // private modalService: NgbModal
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
        // this.activeModal.close();
        this.loading = false;
    }

    // private showItemDetails() {
    //     this.activeModal.close();
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
    // }
}
