import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaphomepageComponent } from './maphomepage.component';

describe('MaphomepageComponent', () => {
  let component: MaphomepageComponent;
  let fixture: ComponentFixture<MaphomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaphomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaphomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
