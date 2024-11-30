import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothecationTerminationComponent } from './hypothecation-termination.component';

describe('HypothecationTerminationComponent', () => {
  let component: HypothecationTerminationComponent;
  let fixture: ComponentFixture<HypothecationTerminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothecationTerminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothecationTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
