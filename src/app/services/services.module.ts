import {NgModule} from '@angular/core';
import {ItemService} from './item.service';
import {ShoppingService} from './shopping.service';
import {StoreService} from './store.service';
import {LoggingService} from './logging.service';

@NgModule({})

export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                ItemService,
                ShoppingService,
                StoreService,
                LoggingService
            ]
        };
    }
}

export {
    ItemService, ShoppingService, StoreService, LoggingService
};
