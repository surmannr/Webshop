import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFavouritesComponent } from './main-favourites.component';

describe('MainFavouritesComponent', () => {
  let component: MainFavouritesComponent;
  let fixture: ComponentFixture<MainFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
