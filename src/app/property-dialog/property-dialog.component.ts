import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface PropertyDialogData {
  name: string;
  address: string;
  status: string;
  rating: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
}

@Component({
  selector: 'app-property-dialog',
  templateUrl: './property-dialog.component.html',
  styleUrls: ['./property-dialog.component.css']
})
export class PropertyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertyDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
