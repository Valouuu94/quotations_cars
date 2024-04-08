import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationRequestService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  uploadImage(file: File): Observable<string> {
    return new Observable(observer => {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            observer.next(url);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        })
      ).subscribe();
    });
  }

  // Méthode pour envoyer un message avec l'URL de l'image
  sendMessage(message: string, imageUrl: string): Promise<void> {
    return this.db.collection('messages').add({
      message,
      imageUrl,
      timestamp: new Date()
    }).then(() => {
      console.log('Message sent successfully');
    }).catch((error: any) => {
      console.error('Error sending message: ', error);
    });
  }
}
