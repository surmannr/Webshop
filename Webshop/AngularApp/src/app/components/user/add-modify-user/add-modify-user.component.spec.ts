import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyUserComponent } from './add-modify-user.component';

describe('AddModifyUserComponent', () => {
  let component: AddModifyUserComponent;
  let fixture: ComponentFixture<AddModifyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
