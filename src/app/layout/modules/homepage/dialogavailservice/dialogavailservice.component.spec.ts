import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogavailserviceComponent } from './dialogavailservice.component';

describe('DialogavailserviceComponent', () => {
  let component: DialogavailserviceComponent;
  let fixture: ComponentFixture<DialogavailserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogavailserviceComponent]
    });
    fixture = TestBed.createComponent(DialogavailserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
