import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSearchComponent } from './root-search.component';

describe('RootSearchComponent', () => {
  let component: RootSearchComponent;
  let fixture: ComponentFixture<RootSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
