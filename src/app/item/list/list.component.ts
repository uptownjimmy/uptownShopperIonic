import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item.model';
// import {ItemDetailComponent} from '../item-detail/item-detail.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'us-item-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
    public items: Item[] = [];
    private selectedItem: Item;
    private subscription: Subscription;

    constructor(
        @Inject('itemService') public itemService,
        // private modalService: NgbModal
    ) {
        this.itemService.getItems();
        this.subscription = this.itemService.itemListChanged.subscribe(
            (newItems: Item[]) => {
                this.items = newItems;
            }
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private openNewItem() {
        // this.openItemDetailModal(true, 'Create New Item');
    }

    private itemListClick(event, item) {
        this.selectedItem = item;
        // this.openItemDetailModal(false, 'Edit Item', item);
    }

    // private openItemDetailModal(isNew: boolean, modalTitle: string, item?: Item) {
    //     setTimeout(() => {
    //         const modalRef = this.modalService.open(ItemDetailComponent);
    //         modalRef.componentInstance.isNew = isNew;
    //         modalRef.componentInstance.modalTitle = modalTitle;
    //         modalRef.componentInstance.item = item;
	//
    //         modalRef.result.then((result) => {
    //             console.log(result);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     });
    // }
}
