import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../property.model';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.properties = this.propertyService.getProperties();
  }

  verDetalles(id: number): void {
    this.router.navigate(['/property', id]);
  }
}
