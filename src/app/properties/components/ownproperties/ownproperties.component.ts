import { Component, inject, OnInit  } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { PropertyService } from '../../services/properties.service';
import { PropertyResponse } from '../../interfaces/property.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownproperties',
  templateUrl: './ownproperties.component.html',
  styleUrl: './ownproperties.component.css'
})
export class OwnpropertiesComponent {
  private title = inject(TitleService);
  ownproperties : Array<PropertyResponse> = [];
  private propertyservice = inject(PropertyService)
  private router = inject(Router);

  ngOnInit(): void {
    this.title.changeTitle("Mis Propiedades");
    this.propertyservice.getOwnProperties().subscribe(
      properties => {
        this.ownproperties = properties;
      }
    )

  }

  goToPropertyDetail(property: any) {
    this.router.navigate(['/properties/own', property.id], { state: { property } });
  }

  getPropertyStars(rating: number): { image: string, alt: string }[] {
    const stars: { image: string, alt: string }[] = [];
         
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push({ image: 'assets/star.png', alt: 'Estrella llena' });
      } else if (i <= rating + 0.5) {
        stars.push({ image: 'assets/star2.png', alt: 'Estrella semi llena' });
      } else {
        stars.push({ image: 'assets/star3.png', alt: 'Estrella vacía' });
      }
    }

    return stars;
  }
  
  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'ocupado':
        return '#FF0000';
      case 'disponible':
        return '#00C914';
      case 'en revision':
        return '#8F8F8F'; 
      default:
        return 'black'; 
    }
  }
}
