import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothecationAdditionComponent } from './hypothecation-addition.component';

describe('HypothecationAdditionComponent', () => {
  let component: HypothecationAdditionComponent;
  let fixture: ComponentFixture<HypothecationAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothecationAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothecationAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
