import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TopbarComponent } from '../topbar/topbar.component';
import {AuthentificationService} from '../../service/authentification.service';



@Component({
  selector: 'app-public-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TopbarComponent],
  templateUrl: './public-signup.component.html',
  styleUrl: './public-signup.component.scss'
})
export class PublicSignupComponent {
    signupForm: FormGroup;
    constructor(private authService: AuthentificationService) {
    this.signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)])
    });
    }
    onSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      this.authService.register(email, password)
        .then(() => {
          console.log('Inscription réussie');
        })
        .catch(error => {
          console.error('Erreur lors de l\'inscription :', error);
        });
    }
  }
    passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
        if (control.parent) {
            const passwordControl = control.parent.get('password');
            const confirmPasswordControl = control.parent.get('confirmPassword');
            if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
                return { 'passwordMismatch': true };
            }
        }
        return null;
    }
}