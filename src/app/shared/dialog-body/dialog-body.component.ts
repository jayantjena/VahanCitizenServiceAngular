import { Component, OnInit } from '@angular/core';
import { Inject  } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any[] , public dialogRef: MatDialogRef<DialogBodyComponent>) { 

    console.log('##########################'+data);
  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }


}
