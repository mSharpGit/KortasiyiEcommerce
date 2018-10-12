import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCartComponent } from './root-cart.component';

describe('RootCartComponent', () => {
  let component: RootCartComponent;
  let fixture: ComponentFixture<RootCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
