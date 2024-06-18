// property.service.ts

import { Injectable } from '@angular/core';
import { Property, Review } from './property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = [
    {
      id: 1,
      name: 'Casa moderna Avellana',
      address: 'av. 123 123 surco',
      status: 'Ocupado',
      bedrooms: 4,
      bathrooms: 2,
      size: 450,
      image: 'assets/property1.jpg',
      reviews: [
        { rating: 5, comment: 'Excelente lugar!', image: 'assets/reviewer1.jpg', reviewerImage: 'assets/user1.jpeg' }
      ]
    },
    {
      id: 2,
      name: 'Casa neura espaciosa',
      address: 'jr. 432 la molina',
      status: 'Disponible',
      bedrooms: 3,
      bathrooms: 2,
      size: 450,
      image: 'assets/property2.jpg',
      reviews: [
        { rating: 4, comment: 'Jardín hermoso!', image: 'assets/reviewer2.jpg', reviewerImage: 'assets/user2.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Casa silvestre rustica',
      address: 'av. abc la molina',
      status: 'En Revisión',
      bedrooms: 4,
      bathrooms: 2,
      size: 400,
      image: 'assets/property3.jpg',
      reviews: [
        { rating: 3, comment: 'Necesita mejoras.', image: 'assets/reviewer3.jpg', reviewerImage: 'assets/user3.jpg' }
      ]
    }
  ];

  getProperties(): Property[] {
    return this.properties;
  }

  getProperty(id: number): Property | undefined {
    return this.properties.find(property => property.id === id);
  }

  updateProperty(id: number, updatedProperty: Property): void {
    const index = this.properties.findIndex(property => property.id === id);
    if (index !== -1) {
      this.properties[index] = updatedProperty;
    }
  }
}
