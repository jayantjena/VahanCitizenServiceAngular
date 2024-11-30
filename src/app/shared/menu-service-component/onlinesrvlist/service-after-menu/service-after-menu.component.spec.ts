import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAfterMenuComponent } from './service-after-menu.component';

describe('ServiceAfterMenuComponent', () => {
  let component: ServiceAfterMenuComponent;
  let fixture: ComponentFixture<ServiceAfterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAfterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAfterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
