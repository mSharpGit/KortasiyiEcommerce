import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSubmitComponent } from './cart-submit.component';

describe('CartSubmitComponent', () => {
  let component: CartSubmitComponent;
  let fixture: ComponentFixture<CartSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
