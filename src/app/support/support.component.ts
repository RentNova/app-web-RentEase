import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  private location = inject(Location);

  faqData = [
    { title: '¿Qué métodos de pago acepta?', content: 'Respuesta sobre métodos de pago.', active: false },
    { title: '¿Cómo puedo contactarme con un propietario?', content: 'Respuesta sobre contacto con propietario.', active: false },
    { title: '¿Cómo obtengo un recibo?', content: 'Respuesta sobre obtención de recibo.', active: false },
    { title: '¿Qué tipo de credencial necesito para poder alquilar un inmueble?', content: 'Respuesta sobre tipo de credencial.', active: false }
  ];

  toggleQuestion(index: number): void {
    this.faqData[index].active = !this.faqData[index].active;
  }
  
  goBack(){
    this.location.back();
  }
}
