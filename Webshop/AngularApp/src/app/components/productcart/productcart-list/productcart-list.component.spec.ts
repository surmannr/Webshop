import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcartListComponent } from './productcart-list.component';

describe('ProductcartListComponent', () => {
  let component: ProductcartListComponent;
  let fixture: ComponentFixture<ProductcartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcartListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
