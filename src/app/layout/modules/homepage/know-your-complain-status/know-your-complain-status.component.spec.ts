import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowYourComplainStatusComponent } from './know-your-complain-status.component';

describe('KnowYourComplainStatusComponent', () => {
  let component: KnowYourComplainStatusComponent;
  let fixture: ComponentFixture<KnowYourComplainStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowYourComplainStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowYourComplainStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
