import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeServiceComponent } from './before-service.component';

describe('BeforeServiceComponent', () => {
  let component: BeforeServiceComponent;
  let fixture: ComponentFixture<BeforeServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeforeServiceComponent]
    });
    fixture = TestBed.createComponent(BeforeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
