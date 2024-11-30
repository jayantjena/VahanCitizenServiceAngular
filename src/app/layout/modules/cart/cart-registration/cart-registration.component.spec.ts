import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRegistrationComponent } from './cart-registration.component';

describe('CartRegistrationComponent', () => {
  let component: CartRegistrationComponent;
  let fixture: ComponentFixture<CartRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartRegistrationComponent]
    });
    fixture = TestBed.createComponent(CartRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
