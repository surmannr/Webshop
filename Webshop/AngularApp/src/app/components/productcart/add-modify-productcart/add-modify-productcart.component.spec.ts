import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyProductcartComponent } from './add-modify-productcart.component';

describe('AddModifyProductcartComponent', () => {
  let component: AddModifyProductcartComponent;
  let fixture: ComponentFixture<AddModifyProductcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyProductcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyProductcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
