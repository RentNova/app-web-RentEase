import { AccountService } from '../../services/account.service';
import { AccountResponse } from './../../../account/interfaces/account-response.interface';
import { Component, inject } from '@angular/core';
import { confirmPasswordValidator } from '../../helpers/register-validators';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { SessionService } from '../../../services/session.service';
import { PasswordResponse } from '../../interfaces/password-reset.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  matcher = new MyErrorStateMatcher();

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AccountService);
  private session = inject(SessionService)

  form: FormGroup = this.formBuilder.group({
    password: ['', Validators.required],
    "passwordconfirm": ['', [Validators.required]]    
  }, {validators: confirmPasswordValidator});

  submitPassword(){
    if(this.form.invalid){
      return;
    }
    const formValue = this.form.value;
    const password: PasswordResponse = { 
      password: formValue.password
    }
    this.authService.changePassword(password, this.session.getUserID()).subscribe(()=>{
      this.router.navigate(["/auth/login"]);
    })

  }
}
