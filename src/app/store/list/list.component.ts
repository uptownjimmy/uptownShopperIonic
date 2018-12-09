import {Component, OnInit} from '@angular/core';
import {Store} from '../store.model';
import {StoreService} from '../store.service';

@Component({
    selector: 'us-store-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [
        StoreService
    ]
})
export class StoreListComponent implements OnInit {
    public stores: Store[];

    constructor(private storeService: StoreService) {
    }

    ngOnInit() {
        this.stores = this.storeService.getStores();
    }
}
