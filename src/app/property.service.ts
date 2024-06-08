import { Injectable } from '@angular/core';
import { Property } from './property.model';

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
        { rating: 5, comment: 'exelente lugar!' }
      ]
    },
    {
      id: 2,
      name: 'casa neura espaciosa',
      address: 'jr. 432 la molina',
      status: 'Disponible',
      bedrooms: 3,
      bathrooms: 2,
      size: 450,
      image: 'assets/property2.jpg',
      reviews: [
        { rating: 4, comment: 'jardin hermoso!' }
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
        { rating: 3, comment: 'nesecita mejoras.' }
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
