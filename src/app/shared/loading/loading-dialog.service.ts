import { Injectable } from '@angular/core';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {
  private opened = false;
  private dialogRef: MatDialogRef<LoadingDialogComponent>;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        data: undefined,
        
         
        maxWidth: "100%",
        disableClose: true,
        hasBackdrop: true
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    this.dialogRef.close();
  }
}
