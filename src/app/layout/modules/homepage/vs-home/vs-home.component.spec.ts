import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsHomeComponent } from './vs-home.component';

describe('VsHomeComponent', () => {
  let component: VsHomeComponent;
  let fixture: ComponentFixture<VsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VsHomeComponent]
    });
    fixture = TestBed.createComponent(VsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
