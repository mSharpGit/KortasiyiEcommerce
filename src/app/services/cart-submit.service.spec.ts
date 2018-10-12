import { TestBed, inject } from '@angular/core/testing';

import { CartSubmitService } from './cart-submit.service';

describe('CartSubmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartSubmitService]
    });
  });

  it('should be created', inject([CartSubmitService], (service: CartSubmitService) => {
    expect(service).toBeTruthy();
  }));
});
