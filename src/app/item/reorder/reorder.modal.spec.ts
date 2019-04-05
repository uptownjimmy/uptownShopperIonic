import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderModalComponent } from './reorder.modal';

describe('ReorderModal', () => {
  let component: ReorderModalComponent;
  let fixture: ComponentFixture<ReorderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderModalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
