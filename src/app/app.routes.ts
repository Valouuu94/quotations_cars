import { Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { PublicLoginComponent } from './component/public-login/public-login.component';
import { PublicSignupComponent } from './component/public-signup/public-signup.component';
import { QuotationComponent } from './component/quotation/quotation.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: PublicLoginComponent },
    { path: 'signup', component: PublicSignupComponent },
    { path: 'create-quote', component: QuotationComponent}
  // Autres routes...
];