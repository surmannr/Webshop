import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductsFilterProductNameComponent } from './main-products-filter-product-name.component';

describe('MainProductsFilterProductNameComponent', () => {
  let component: MainProductsFilterProductNameComponent;
  let fixture: ComponentFixture<MainProductsFilterProductNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductsFilterProductNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductsFilterProductNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
