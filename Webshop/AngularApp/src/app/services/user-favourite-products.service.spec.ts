import { TestBed } from '@angular/core/testing';

import { UserFavouriteProductsService } from './user-favourite-products.service';

describe('UserFavouriteProductsService', () => {
  let service: UserFavouriteProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFavouriteProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
