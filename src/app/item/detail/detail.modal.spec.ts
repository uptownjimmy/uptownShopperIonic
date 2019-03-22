import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailModal } from './detail.modal';

describe('OptionsModal', () => {
  let component: ItemDetailModal;
  let fixture: ComponentFixture<ItemDetailModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailModal ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
