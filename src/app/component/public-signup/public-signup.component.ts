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
    authentificationService = inject(AuthentificationService);
    signupForm: FormGroup;
    constructor() {
    this.signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', Validators.required)
    });
    }
    onSubmit() {
        this.authentificationService.register(this.signupForm.value.email, this.signupForm.value.password).subscribe(() => {
            console.log('inscription réussie');
    });
    }
}