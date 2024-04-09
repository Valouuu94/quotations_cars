import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TopbarComponent } from '../topbar/topbar.component';


@Component({
  selector: 'app-home-page',
standalone: true,
  imports: [TopbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn');
constructor(private router: Router) { }
    onClickSignup() {
        this.router.navigateByUrl('/signup');
    }
    onClickLogin() {
        this.router.navigateByUrl('/login');
    }
    ngOnInit() {
        if (this.isLoggedIn === 'true') {
            this.router.navigateByUrl('/create-quote');
        }
    }
}
