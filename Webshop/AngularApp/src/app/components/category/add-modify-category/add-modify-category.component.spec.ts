import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyCategoryComponent } from './add-modify-category.component';

describe('AddModifyCategoryComponent', () => {
  let component: AddModifyCategoryComponent;
  let fixture: ComponentFixture<AddModifyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
