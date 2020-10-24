import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyOrderitemComponent } from './add-modify-orderitem.component';

describe('AddModifyOrderitemComponent', () => {
  let component: AddModifyOrderitemComponent;
  let fixture: ComponentFixture<AddModifyOrderitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyOrderitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyOrderitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
