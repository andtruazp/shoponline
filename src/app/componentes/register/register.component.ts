import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
  fullName: ['',Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password:['', [Validators.required, this.passwordValidator]],
  confirmPassword: ['', Validators.required]
  },{
    validators: passwordMatchValidator
  })

  constructor(private fb:FormBuilder, private authService: AuthService,
    private messageService: MessageService, private router:Router,
    private mensaje: MessageService
  ){}

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

  enviarRegistro(){
    const data = {...this.registerForm.value};

    delete data.confirmPassword;

    this.authService.registerUser(data as User).subscribe(
      response => {
        console.log(response)
        this.mensaje.add({severity: 'success', summary: 'Success',
          detail: 'Registro Agregado'});
        this.router.navigate(['login']);
      },
      error => console.log(error)
    )
  }

}
