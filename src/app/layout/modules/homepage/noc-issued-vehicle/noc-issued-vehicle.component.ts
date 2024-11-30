import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 

@Component({
  selector: 'app-noc-issued-vehicle',
  templateUrl: './noc-issued-vehicle.component.html',
  styleUrls: ['./noc-issued-vehicle.component.css']
})
export class NocIssuedVehicleComponent {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<NocIssuedVehicleComponent>
    ) { }


  close() {
    this.dialogRef.close();
  }
}
