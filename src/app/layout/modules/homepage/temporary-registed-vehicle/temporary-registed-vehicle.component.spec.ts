import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryRegistedVehicleComponent } from './temporary-registed-vehicle.component';

describe('TemporaryRegistedVehicleComponent', () => {
  let component: TemporaryRegistedVehicleComponent;
  let fixture: ComponentFixture<TemporaryRegistedVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporaryRegistedVehicleComponent]
    });
    fixture = TestBed.createComponent(TemporaryRegistedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
