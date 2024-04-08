import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {
    firebaseAuth= inject(Auth) ;
    register(email: string, password: string): Observable<void>{
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(response =>  updateProfile(response.user, {displayName: email}));
        return from(promise);
    }

}
