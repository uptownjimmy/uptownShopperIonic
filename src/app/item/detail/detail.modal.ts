import {AfterViewInit, Component, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController, PopoverController} from '@ionic/angular';

// import {ShoppingItemOptionsPopover} from '../../shopping/options/options.popover';
import {ConfirmDeleteItemPopover} from '../confirm/confirm.popover';
import {Item} from '../item.model';
import {ItemTypes} from '../ItemType.model';
import {Store} from '../../store/store.model';

@Component({
  selector: 'us-item-detail',
  templateUrl: './detail.modal.html',
  styleUrls: ['./detail.modal.scss'],
})
export class ItemDetailModal implements OnInit, AfterViewInit {
  @Input() isNew: boolean;
  @Input() modalTitle: string;
  @Input() item: Item;

  private name: string = null;
  private item_Type: number = null;
  private active: boolean = null;
  private notes: string = null;
  private stores = Store;
  protected item_Types = ItemTypes;
  public loading = false;
  public itemDetailForm;
  // public popoverTitle = 'Delete Confirmation';
  // public popoverMessage = 'Are you sure you want to delete this item?';
  // public confirmClicked = false;
  // public cancelClicked = false;

  constructor(
    @Inject('itemService') private itemService,
    private renderer: Renderer2,
    public modalController: ModalController,
    public popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
    if (this.item) {
      this.name = this.item.name;
      this.item_Type = this.item.item_Type;
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
      item_Type: new FormControl(this.item_Type, Validators.required),
      active: new FormControl(this.active),
      notes: new FormControl(this.notes),
      // kroger: new FormControl(this.stores[0].active),
      // traderJoe: new FormControl(this.stores[1].active),
      // lowe: new FormControl(this.stores[3].active),
    });
  }

  ngAfterViewInit(): void {}

  private formSubmit() {
    console.log(this.itemDetailForm.value);

    this.loading = true;

    if (this.item) {
      this.item.name = this.itemDetailForm.value.name;
      this.item.item_Type = this.itemDetailForm.value.item_Type;
      this.item.notes = this.itemDetailForm.value.notes;
      this.itemService.updateExistingItem(this.item);
    } else {
      this.itemService.createNewItem(this.itemDetailForm.value);
    }

    this.loading = false;
    this.modalController.dismiss();
  }

  private async openConfirmDeleteItemPopover() {
    const popover = await this.popoverController.create({
      component: ConfirmDeleteItemPopover,
      componentProps: {item: this.item},
      event,
    });

    return await popover.present();
  }

  private closeModal() {
    this.modalController.dismiss();
  }
}
