import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsComponent } from './update.modal';

describe('AddItemsComponent', () => {
  let component: AddItemsComponent;
  let fixture: ComponentFixture<AddItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
