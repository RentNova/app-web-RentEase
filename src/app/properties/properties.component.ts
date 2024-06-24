import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../services/property.service';
import { PropertyDialogComponent } from '../property-dialog/property-dialog.component';

interface Property {
  id: number;
  name: string;
  address: string;
  status: string;
  rating: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties().subscribe(properties => this.properties = properties);
  }

  openAddPropertyDialog(): void {
    const dialogRef = this.dialog.open(PropertyDialogComponent, {
      width: '250px',
      data: { name: '', address: '', status: '', rating: 0, bedrooms: 0, bathrooms: 0, size: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProperty(result);
      }
    });
  }

  addProperty(propertyData: Omit<Property, 'id'>): void {
    this.propertyService.addProperty(propertyData).subscribe(property => this.properties.push(property));
  }

  updateProperty(id: number, newStatus: string): void {
    const property = this.properties.find(p => p.id === id);
    if (property) {
      const updatedProperty = { ...property, status: newStatus };
      this.propertyService.updateProperty(updatedProperty).subscribe(updatedProperty => {
        const index = this.properties.findIndex(p => p.id === updatedProperty.id);
        this.properties[index] = updatedProperty;
      });
    }
  }

  deleteProperty(id: number): void {
    this.propertyService.deleteProperty(id).subscribe(() => {
      this.properties = this.properties.filter(p => p.id !== id);
    });
  }
}
