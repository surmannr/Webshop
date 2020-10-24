import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyReviewComponent } from './add-modify-review.component';

describe('AddModifyReviewComponent', () => {
  let component: AddModifyReviewComponent;
  let fixture: ComponentFixture<AddModifyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
