import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharAuthenticationComponent } from './aadhar-authentication.component';

describe('AadharAuthenticationComponent', () => {
  let component: AadharAuthenticationComponent;
  let fixture: ComponentFixture<AadharAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
