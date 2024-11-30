import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocIssuedVehicleComponent } from './noc-issued-vehicle.component';

describe('NocIssuedVehicleComponent', () => {
  let component: NocIssuedVehicleComponent;
  let fixture: ComponentFixture<NocIssuedVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NocIssuedVehicleComponent]
    });
    fixture = TestBed.createComponent(NocIssuedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
