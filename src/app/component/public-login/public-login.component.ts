import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-public-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TopbarComponent],
  templateUrl: './public-login.component.html',
  styleUrl: './public-login.component.scss'
})
export class PublicLoginComponent {
 loginForm: FormGroup;
    constructor() {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    }

onSubmit() {
    console.log('connection en cours...');
}

}
