import { Injectable, inject  } from '@angular/core';
import { Storage, ref, uploadBytesResumable, UploadTask, getDownloadURL, getStorage   } from '@angular/fire/storage';
import { Firestore, collection, addDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationRequestService {
  private readonly storage: Storage = getStorage();
  constructor(
    private db: Firestore
  ) { }

  uploadImage(file: File): Observable<string> {
    return new Observable<string>(observer => {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      const task: UploadTask = uploadBytesResumable(fileRef, file);

      task.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url: string | undefined) => {
          observer.next(url);
          observer.complete();
        }).catch((error: any) => {
          observer.error(error);
        });
      }).catch(error => {
        observer.error(error);
      });
    });
  }

   sendMessage(message: string, imageUrl: string): Promise<void> {
    return addDoc(collection(this.db, 'messages'), {
      message,
      imageUrl,
      timestamp: new Date()
    }).then(() => {
      console.log('Message sent successfully');
    }).catch((error: any) => {
      console.error('Error sending message: ', error);
      throw error;
    });
  }
}
