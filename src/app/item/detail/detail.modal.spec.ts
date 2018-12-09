import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModal } from './detail.modal';

describe('OptionsModal', () => {
  let component: DetailModal;
  let fixture: ComponentFixture<DetailModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
