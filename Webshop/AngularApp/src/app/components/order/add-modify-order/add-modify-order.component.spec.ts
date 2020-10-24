import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyOrderComponent } from './add-modify-order.component';

describe('AddModifyOrderComponent', () => {
  let component: AddModifyOrderComponent;
  let fixture: ComponentFixture<AddModifyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
