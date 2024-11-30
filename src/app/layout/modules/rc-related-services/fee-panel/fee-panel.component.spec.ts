import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePanelComponent } from './fee-panel.component';

describe('FeePanelComponent', () => {
  let component: FeePanelComponent;
  let fixture: ComponentFixture<FeePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
