import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingstagesComponent } from './pendingstages.component';

describe('PendingstagesComponent', () => {
  let component: PendingstagesComponent;
  let fixture: ComponentFixture<PendingstagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingstagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingstagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
