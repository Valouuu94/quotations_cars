import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';



@Component({
  selector: 'app-public-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TopbarComponent],
  templateUrl: './public-login.component.html',
  styleUrl: './public-login.component.scss'
})
export class PublicLoginComponent {
 loginForm: FormGroup;
    constructor(private authService: AuthentificationService, private router: Router, private notificationService: NotificationService) {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    }

onSubmit() {
    if (this.loginForm.valid) {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        
        this.authService.signIn(email, password)
            .then(() => {
            console.log('Connexion réussie');
            })
            .catch(error => {
            console.log('Erreur lors de la connexion :', error);
            });
        this.router.navigateByUrl('/create-quote')
        this.notificationService.showSuccess('Connexion réussie');
        }
  }
}