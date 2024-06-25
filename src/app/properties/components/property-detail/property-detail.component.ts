import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TitleService } from '../../services/title.service';
import { PropertyService } from '../../services/properties.service';
import { map } from 'rxjs';
import { ClientResponse } from '../../interfaces/client.interface';
import { MatDialog } from '@angular/material/dialog';
import { ReviewCreateComponent } from '../../../reviews/components/review-create/review-create.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {
  propiedad: any;
  clientdata: {
    userId: number,
    cuantity: number,
    contractStart: string,
    contractEnd: string
  } = {
    userId: 2,
    cuantity: 1,
    contractStart: "",
    contractEnd: ""
  };
  client: ClientResponse | null = null;
  private title = inject(TitleService);
  private propertyservice = inject(PropertyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private dialog = inject(MatDialog);

  public url: string ='';


  openChangeReviewDialog(): void {
    const id = this.router.url.split('/').pop(); // Extrae el id de la URL actual
    const dialogRef = this.dialog.open(ReviewCreateComponent, {
      width: '50%',
      data: { id: id } // Pasa el id como dato al diálogo
    });
  }

  shouldShow(): boolean {
    return this.url.includes('/own');
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
    this.title.changeTitle("Mis Propiedades");

    if (history.state && history.state.property) {
      this.propiedad = history.state.property;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
    }
    this.clientdata = {...this.propiedad.occupiedBy};
    if(this.propiedad.occupiedBy.userId){

      this.propertyservice.getPropertyClient(this.propiedad.occupiedBy.userId).pipe(
        map((client: any) => ({
          id: client.id,
          firstName: client.firstName,
          lastName: client.lastName,
          img: client.img
        }))
      )
      .subscribe((client: ClientResponse) => {
        this.client = client;
      });
      }
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
