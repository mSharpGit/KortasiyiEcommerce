import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootItemDetailComponent } from './root-item-detail.component';

describe('RootItemDetailComponent', () => {
  let component: RootItemDetailComponent;
  let fixture: ComponentFixture<RootItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
