import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftmenuAfterPanelComponent } from './services-menu.component';

describe('LeftmenuAfterPanelComponent', () => {
  let component: LeftmenuAfterPanelComponent;
  let fixture: ComponentFixture<LeftmenuAfterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftmenuAfterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftmenuAfterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
