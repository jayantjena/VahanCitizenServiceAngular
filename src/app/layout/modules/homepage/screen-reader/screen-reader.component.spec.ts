import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenReaderComponent } from './screen-reader.component';

describe('ScreenReaderComponent', () => {
  let component: ScreenReaderComponent;
  let fixture: ComponentFixture<ScreenReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenReaderComponent]
    });
    fixture = TestBed.createComponent(ScreenReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
