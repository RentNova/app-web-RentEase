import { Component, inject } from '@angular/core';
import { PropertyResponse } from '../properties/interfaces/property.interface';
import { PropService } from './services/prop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private propertyservice = inject(PropService);
  private router = inject(Router);

  properties : Array<PropertyResponse> = [];

  ngOnInit(): void {
    this.propertyservice.getProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    )
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
  goToPropertyDetail(property: any) {
    this.router.navigate(['/properties', property.id], { state: { property } });
  }
  
}
