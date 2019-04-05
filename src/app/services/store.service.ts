import {Store} from '../store/store.model';

export class StoreService {
  private stores: Store[] = [
    new Store(2, 'Kroger', 'Alps Road'),
    new Store(1, 'Publix', 'Watkinsville'),
    new Store(5, 'Lowe\'s', 'Epps Bridge Road'),
    new Store(3, 'Trader Joe\'s', 'Epps Bridge Road'),
  ];

  getStores() {
    return this.stores.slice();
  }

}
