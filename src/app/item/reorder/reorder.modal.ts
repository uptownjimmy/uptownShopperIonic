import {Component, Inject, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {Item} from '../item.model';
import {Store} from '../../store/store.model';

@Component({
  selector: 'us-reorder',
  templateUrl: './reorder.modal.html',
  styleUrls: ['./reorder.modal.css'],
})
export class ReorderModalComponent implements OnInit {
  @Input() modalTitle: string;

  public items: Item[] = [];
  private subscription: Subscription;
  private stores = Store;

  constructor(
    @Inject('itemService') public itemService,
    public modalController: ModalController,
  ) {
    this.itemService.getItems();
    this.subscription = this.itemService.itemListChanged.subscribe(
      (newItems: Item[]) => {
        this.items = newItems;
      },
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private reorder(event) {
    const itemToMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  private closeModal() {
    this.modalController.dismiss();
  }
}
