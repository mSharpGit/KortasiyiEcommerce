import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSearchItemsComponent } from './root-search-items.component';

describe('RootSearchItemsComponent', () => {
  let component: RootSearchItemsComponent;
  let fixture: ComponentFixture<RootSearchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootSearchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootSearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
