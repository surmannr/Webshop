import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductsFilterCategoryComponent } from './main-products-filter-category.component';

describe('MainProductsFilterCategoryComponent', () => {
  let component: MainProductsFilterCategoryComponent;
  let fixture: ComponentFixture<MainProductsFilterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductsFilterCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductsFilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
