import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemListComponent } from './orderitem-list.component';

describe('OrderitemListComponent', () => {
  let component: OrderitemListComponent;
  let fixture: ComponentFixture<OrderitemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderitemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
