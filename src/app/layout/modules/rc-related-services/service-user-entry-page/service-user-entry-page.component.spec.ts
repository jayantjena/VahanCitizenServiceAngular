import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUserEntryPageComponent } from './service-user-entry-page.component';

describe('ServiceUserEntryPageComponent', () => {
  let component: ServiceUserEntryPageComponent;
  let fixture: ComponentFixture<ServiceUserEntryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceUserEntryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceUserEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
