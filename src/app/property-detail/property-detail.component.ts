import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../property.service';
import { Property } from '../property.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: Property | undefined;
  pageTitle: string = 'Mis Propiedades';

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.property = this.propertyService.getProperty(id);
      }
    });
  }

  save(): void {
    if (this.property) {
      this.propertyService.updateProperty(this.property.id, this.property);
      console.log('Propiedad guardada:', this.property);
    }
  }
}
