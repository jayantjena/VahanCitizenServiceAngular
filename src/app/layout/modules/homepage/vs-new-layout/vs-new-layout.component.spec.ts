import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsNewLayoutComponent } from './vs-new-layout.component';

describe('VsNewLayoutComponent', () => {
  let component: VsNewLayoutComponent;
  let fixture: ComponentFixture<VsNewLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VsNewLayoutComponent]
    });
    fixture = TestBed.createComponent(VsNewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
