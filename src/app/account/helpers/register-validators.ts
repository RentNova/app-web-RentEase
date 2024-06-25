import { AbstractControl, ValidationErrors } from "@angular/forms";

export const confirmPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
    return control.get('password')?.value === control.get('passwordconfirm')?.value
      ? null
      : { PasswordNoMatch: true };
};