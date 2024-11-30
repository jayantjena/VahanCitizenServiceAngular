import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplstatusComponent } from './applstatus.component';

describe('ApplstatusComponent', () => {
  let component: ApplstatusComponent;
  let fixture: ComponentFixture<ApplstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
