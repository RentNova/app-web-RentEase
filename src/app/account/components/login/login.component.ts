import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from '../../services/account.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  matcher = new MyErrorStateMatcher();
  
  private formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);
  test:boolean = false;

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required]
  });
  
  
  submitLogin():void {
    if(this.formGroup.invalid){
      this.test = true;
      return;
    }
    const formValue = this.formGroup.value;
    this.accountService.login(formValue?.email, formValue?.password).subscribe(
      response =>{},
      error => {
        this.formGroup.setErrors({'WrongCredentials' : true});        
      }
    );
  }
}
          