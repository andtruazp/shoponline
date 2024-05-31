import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
  fullName: ['',Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password:['', [Validators.required, Validators.pattern(/^(?=.*\d) (?=.*[a-z])(?=.*[A-Z])[0-9a-zA-z](8,)$/)]],
  confirmPassword: ['', Validators.required]
  },{
    validators: passwordMatchValidator
  })

  constructor(private fb:FormBuilder){}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email(){
    return this.registerForm.controls['fullName'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

}
