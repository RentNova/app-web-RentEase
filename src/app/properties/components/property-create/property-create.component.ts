import { PropertyService } from './../../services/properties.service';
import { Component, inject } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoComponent } from '../../../shared/upload-photo/upload-photo.component';
import { ImageResponse } from '../../../account/interfaces/image.interface';
import { PropertyResponse } from '../../interfaces/property.interface';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.css'
})
export class PropertyCreateComponent {
  private title = inject(TitleService);
  private formBuilder = inject(FormBuilder);
  private propertyservice = inject(PropertyService)
  private router = inject(Router)
  matcher = new MyErrorStateMatcher();
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.title.changeTitle("Agregar Propiedad");

  }

  imageUrl: string | null = null;

  openChangePhotoDialog(): void {
    const dialogRef = this.dialog.open(UploadPhotoComponent, {
      width: '400px'// Ancho del diálogo
    });

    dialogRef.componentInstance.fileSelected.subscribe((file: string) => {
      if (file) {
        const photo: ImageResponse = { 
          img: file
        }
        this.imageUrl = file;
        console.log('Archivo seleccionado:', file);
      } else {
        console.log('No se seleccionó ningún archivo.');
      }
    });
  }

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    size: ['', Validators.required],
    rooms: ['', Validators.required],
    bathrooms: ['', Validators.required],
    description: ['', Validators.required],
    ubication: ['', Validators.required]
  });
  submitRegister():void{
    if(this.form.invalid){
      return;
    }
    const formValue = this.form.value;
    const property: PropertyResponse = {
      id: 0 ,
      owner : 0,
      state : "En Revision",
      name: formValue.name,
      rating: 0,
      type: formValue.type,
      rooms: formValue.rooms,
      bathrooms: formValue.bathrooms,
      size: formValue.size,
      ubication: formValue.ubication,
      description: formValue.description,
      reviews: [],
      occupiedBy: {},
      img: this.imageUrl
  }
    
    this.propertyservice.createProperty(property).subscribe(()=>{
        this.router.navigate(["/properties/own"]);
    });
  }



}

