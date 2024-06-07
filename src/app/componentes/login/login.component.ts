import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../servicios/auth.service';

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

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login(){
    console.log('login')
    const {email, password} = this.loginForm.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        }else {
          this.messageService.add({severity: 'error', summary: 'Error', detail:'Email o Contraseña incrrecta'})
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail:'Email o Contraseña incrrecta'})
      }
    )
  }
}
