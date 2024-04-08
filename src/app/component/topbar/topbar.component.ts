import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../service/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

constructor(private router: Router, private authService: AuthentificationService) { }
  isLoggedIn = this.authService.isLoggedIn;

    onClickSignup() {
        this.router.navigateByUrl('/signup');
    }
    onLogoClick() {
        this.router.navigateByUrl('');
    }
    onClickLogin() {
        this.router.navigateByUrl('/login');

    }
    async logout() {
        await  this.authService.signOut();
        this.router.navigateByUrl('');

    }
}
