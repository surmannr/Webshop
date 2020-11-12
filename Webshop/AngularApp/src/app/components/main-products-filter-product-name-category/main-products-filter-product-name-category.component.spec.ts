import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductsFilterProductNameCategoryComponent } from './main-products-filter-product-name-category.component';

describe('MainProductsFilterProductNameCategoryComponent', () => {
  let component: MainProductsFilterProductNameCategoryComponent;
  let fixture: ComponentFixture<MainProductsFilterProductNameCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductsFilterProductNameCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductsFilterProductNameCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
