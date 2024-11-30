import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServiceListComponent } from './online-service-list.component';

describe('OnlineServiceListComponent', () => {
  let component: OnlineServiceListComponent;
  let fixture: ComponentFixture<OnlineServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
