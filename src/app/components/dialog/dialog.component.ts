import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    templateUrl: 'dialog.component.html'
})
export class Dialog {
  
    constructor(
      public dialogRef: MatDialogRef<Dialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

}