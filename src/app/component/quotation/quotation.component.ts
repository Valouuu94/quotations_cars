import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuotationRequestService } from '../../service/quotation-request.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TopbarComponent],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss'
})
export class QuotationComponent {
  quotationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private quotation: QuotationRequestService, private notificationService: NotificationService) {
    this.quotationForm = this.fb.group({
      message: [''],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            this.notificationService.showError('Type de fichier non autorisé. Veuillez sélectionner une image PNG, JPEG ou JPG.');
            return;
        }
        this.quotationForm.patchValue({ image: file });
    }
  }
  
  onSubmit() {
    if (this.quotationForm.valid) {
      const file: File = this.quotationForm.get('image')?.value;
      this.quotation.uploadImage(file).subscribe(url => {
        this.quotation.sendMessage(this.quotationForm.get('message')?.value, url, status).then(() => {
          console.log('Quotation request sent successfully');
        }).catch(error => console.error(error));
      }, error => console.error(error));
    }
  }
}
