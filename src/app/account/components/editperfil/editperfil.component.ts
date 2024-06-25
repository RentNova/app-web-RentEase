import { UploadPhotoComponent } from './../../../shared/upload-photo/upload-photo.component';
import { Component, inject } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { Location } from "@angular/common";
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { confirmPasswordValidator } from '../../helpers/register-validators';
import { AccountResponse } from '../../interfaces/account-response.interface';
import { RegisterResponse } from '../../interfaces/register-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImageResponse } from '../../interfaces/image.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrl: './editperfil.component.css'
})
export class EditperfilComponent {
  private session = inject(SessionService);
  private location = inject(Location);
  private dialog = inject(MatDialog);
  
  matcher = new MyErrorStateMatcher();

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private accountService = inject(AccountService);

  imageUrl: string | ArrayBuffer | null = null;

  openChangePhotoDialog(): void {
    const dialogRef = this.dialog.open(UploadPhotoComponent, {
      width: '400px'// Ancho del diálogo
    });

    dialogRef.componentInstance.fileSelected.subscribe((file: string) => {
      if (file) {
        const photo: ImageResponse = { 
          img: file
        }
        this.accountService.changePhoto(photo, this.session.getUserID()).subscribe(()=>{
            this.imageUrl = file;
        });
        console.log('Archivo seleccionado:', file);
      } else {
        console.log('No se seleccionó ningún archivo.');
      }
    });
  }

  userDetails : any | null = null;

  form: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    cellphone: ['', [Validators.required, Validators.pattern('^9\\d{8}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    "passwordconfirm": ['']    
  }, {validators: confirmPasswordValidator});

  ngOnInit(): void {
    this.userDetails = this.session.getUserDetails();
    this.imageUrl = this.session.getUserImage();
    console.log(this.userDetails);
    this.form.setValue({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      age: this.userDetails.age,
      cellphone: this.userDetails.cellphone,
      email: this.userDetails.email,
      password: "",
      "passwordconfirm": ""    
    })
  }

  goBack(){
    this.location.back();
  }



  


  submitRegister():void{
    if(this.form.invalid){
      return;
    }
    const formValue = this.form.value;
    let id = this.session.getUserID()!;
    const newAccount: AccountResponse = {
      id : id,
      email : formValue.email,
      password : formValue.password,
      userDetailsId : 1
    }
    const newUser: RegisterResponse = {
      id: this.session.getUserID()!,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      age: Number(formValue.age),
      cellphone: formValue.cellphone
    }
    
    this.accountService.editUserDetails(newUser, id).subscribe(()=>{
      this.accountService.editAccount(newAccount, id).subscribe(()=>{
        this.router.navigate(["/account/perfil"]);
      })
    });
  }
}
