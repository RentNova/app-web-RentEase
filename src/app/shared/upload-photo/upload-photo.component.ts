import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.css'
})
export class UploadPhotoComponent {
  @Output() fileSelected = new EventEmitter<string | ArrayBuffer | null>();
  
  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target!.result;
        console.log(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  acceptInput(){
    const file: File | undefined = (document.getElementById('file') as HTMLInputElement).files![0];
    if (file) {      
      this.fileSelected.emit(this.imageUrl);
    }
  }
}
