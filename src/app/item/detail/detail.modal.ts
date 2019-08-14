import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';

// import {ShoppingItemOptionsPopover} from '../../shopping/options/options.popover';
// import {Store} from '../../store/store.model';
import {ConfirmDeleteItemPopover} from '../confirm/confirm.popover';
import {ItemCategories} from '../ItemCategory.model';
import {QueryItem} from '../../types';

@Component({
  selector: 'us-item-detail',
  templateUrl: './detail.modal.html',
  styleUrls: ['./detail.modal.scss'],
})
export class ItemDetailModal implements OnInit, AfterViewInit {
  @Input() isNew: boolean;
  @Input() modalTitle: string;
  @Input() item: QueryItem;

  private name: string = null;
  private category: string = null;
  private active: boolean = null;
  private notes: string = null;
  // private stores = Store;
  public categories = ItemCategories;
  public loading = false;
  public itemDetailForm;
  // public popoverTitle = 'Delete Confirmation';
  // public popoverMessage = 'Are you sure you want to delete this item?';
  // public confirmClicked = false;
  // public cancelClicked = false;

  constructor(
    @Inject('itemService') private itemService,
    // private renderer: Renderer2,
    public modalController: ModalController,
    public alertController: AlertController

  ) {
  }

  ngOnInit() {
    if (this.item) {
      this.name = this.item.name;
      this.category = this.item.category;
      this.active = this.item.active;
      this.notes = this.item.notes;
      // this.item.store_Names.forEach(store_Name => {
      //     this.stores.forEach(store => {
      //         if (store.name === store_Name) {
      //             store.active = true;
      //         }
      //     });
      // });
    }
    this.itemDetailForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      category: new FormControl(this.category, Validators.required),
      active: new FormControl(this.active),
      notes: new FormControl(this.notes),
      // kroger: new FormControl(this.stores[0].active),
      // traderJoe: new FormControl(this.stores[1].active),
      // lowe: new FormControl(this.stores[3].active),
    });
  }

  ngAfterViewInit(): void {}

  formSubmit() {
    console.log(this.itemDetailForm.value);

    this.loading = true;

    if (this.item) {
      // this.item.itemId;
      this.item.name = this.itemDetailForm.value.name;
      this.item.category = this.itemDetailForm.value.category;
      this.item.notes = this.itemDetailForm.value.notes;
      this.itemService.updateExistingItem(this.item);
    } else {
      this.itemService.createNewItem(this.itemDetailForm.value);
    }

    this.loading = false;
    this.modalController.dismiss();
  }

  async openConfirmDeleteItemPopover() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete!',
      message: 'Are you sure you want to delete this item from your pantry forever?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        }, {
          text: 'Delete',
          handler: () => {
            this.itemService.deleteItem(this.item);
            this.closeModal();
          },
        },
      ],
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
