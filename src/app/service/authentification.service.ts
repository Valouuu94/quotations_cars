import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , Auth} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {
    private auth: Auth;
    
    isLoggedIn = false

    constructor(private notificationsService: NotificationService, private firestore :Firestore) { 
         this.auth = getAuth();
        console.log('islooged',this.isLoggedIn);
    }

    async register(email: string, password: string): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

            const userDocRef = doc(this.firestore, 'users', userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, { email });
                this.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                this.notificationsService.showSuccess('Utilisateur créé avec succès');
            } else {
                this.notificationsService.showError('Utilisateur déjà existant');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            throw error;
        }
    }

    async signIn(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            this.notificationsService.showSuccess('Connexion réussie');
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(this.auth);
            this.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            this.notificationsService.showSuccess('Déconnexion réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            throw error;
        }
    }
}
