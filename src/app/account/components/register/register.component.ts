import { RegisterResponse } from './../../interfaces/register-response.interface';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../interfaces/account-response.interface';
import { ErrorStateMatcher } from '@angular/material/core';
import { confirmPasswordValidator } from '../../helpers/register-validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  matcher = new MyErrorStateMatcher();

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private accountService = inject(AccountService);


  form: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    cellphone: ['', [Validators.required, Validators.pattern('^9\\d{8}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    "passwordconfirm": ['', [Validators.required]]    
  }, {validators: confirmPasswordValidator});


  submitRegister():void{
    if(this.form.invalid){
      return;
    }
    const formValue = this.form.value;

    const newAccount: AccountResponse = {
      id : 1,
      email : formValue.email,
      password : formValue.password,
      userDetailsId : 1
    }
    const newUser: RegisterResponse = {
      id: 1,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      age: Number(formValue.age),
      cellphone: formValue.cellphone
    }

    this.accountService.registerAccountDetails(newUser).subscribe(() => {
      this.accountService.registerAccount(newAccount).subscribe(()=>{
        this.router.navigate(["/account/auth/login"]);
      });
    });
  }
}
