import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NocIssuedVehicleComponent } from '../noc-issued-vehicle/noc-issued-vehicle.component';

@Component({
  selector: 'app-temporary-registed-vehicle',
  templateUrl: './temporary-registed-vehicle.component.html',
  styleUrls: ['./temporary-registed-vehicle.component.css']
})
export class TemporaryRegistedVehicleComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<TemporaryRegistedVehicleComponent>
    ) { }


  close() {
    this.dialogRef.close();
  }
}
