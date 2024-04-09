import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
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

  constructor(private fb: FormBuilder, private quotation: QuotationRequestService, private notificationService: NotificationService) {
    this.quotationForm = this.fb.group({
      message: ['', Validators.required],
      image: [null, Validators.required]
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
      const price = '';
      const status = 'pending';
      this.quotation.uploadImage(file).subscribe(url => {
        this.quotation.sendMessage(this.quotationForm.get('message')?.value, url, status, price).then(() => {
          this.notificationService.showSuccess('Quotation request sent successfully');
        }).catch(error => console.error(error));
      }, error => console.error(error));
    }
  }
}
