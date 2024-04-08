import { Component } from '@angular/core';
import {TopbarComponent } from '../topbar/topbar.component';


@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss'
})
export class QuotationComponent {

}
