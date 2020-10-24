import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyCartComponent } from './add-modify-cart.component';

describe('AddModifyCartComponent', () => {
  let component: AddModifyCartComponent;
  let fixture: ComponentFixture<AddModifyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
