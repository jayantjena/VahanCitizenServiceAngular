import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOfOwnershipDetailComponent } from './transfer-of-ownership-detail.component';

describe('TransferOfOwnershipDetailComponent', () => {
  let component: TransferOfOwnershipDetailComponent;
  let fixture: ComponentFixture<TransferOfOwnershipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferOfOwnershipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOfOwnershipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
