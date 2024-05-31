import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]]
  })

  constructor(private fb:FormBuilder){}
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    let errors = {};

    if (!/[a-z]/.test(value)) {
      errors = { ...errors, lowercase: true };
    }

    if (!/[A-Z]/.test(value)) {
      errors = { ...errors, uppercase: true };
    }

    if (!/[^A-Za-z0-9]/.test(value)) {
      errors = { ...errors, special: true };
    }

    if (value.length < 8) {
      errors = { ...errors, minlength: true };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
}
