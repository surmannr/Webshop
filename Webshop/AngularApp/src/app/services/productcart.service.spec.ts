import { TestBed } from '@angular/core/testing';

import { ProductcartService } from './productcart.service';

describe('ProductcartService', () => {
  let service: ProductcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
