import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifySupplierComponent } from './add-modify-supplier.component';

describe('AddModifySupplierComponent', () => {
  let component: AddModifySupplierComponent;
  let fixture: ComponentFixture<AddModifySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifySupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
