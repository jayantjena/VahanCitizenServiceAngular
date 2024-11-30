import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private opened = false;

  constructor(private dialog: MatDialog) { }

  openDialog(message: String, status?: number): void {
    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { message, status },
        disableClose: true,
        hasBackdrop: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
        this.dialog.closeAll();
        //window.location.reload();
      });
    }
     
    
  }
   
}
