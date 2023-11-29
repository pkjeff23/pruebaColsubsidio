import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fomrbuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fomrbuilder.group({
      user: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    });
  }

  onlogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.router.navigate(['clientes/listar']);
  }

  getUserErrorMessage() {
    if (this.loginForm.controls["user"].hasError('required')) {
      return 'El usuario es requerido';
    }

   if(this.loginForm.controls["user"].hasError('email')) {
      return 'El usuario debe ser un correo electrónico';
    }

    return "";
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls["pass"].hasError('required')) {
      return 'La contraseña es requerida';
    }
    
    return "";
  }
}
