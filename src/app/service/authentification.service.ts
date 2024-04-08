import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut, getAuth, onAuthStateChanged  } from 'firebase/auth';
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {
    private auth: Auth;
    private firestore = getFirestore();
    isLoggedIn = false

    constructor() {
        this.auth = getAuth();
        console.log('islooged',this.isLoggedIn);
    }

    async register(email: string, password: string): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            
            const userDocRef = doc(this.firestore, 'users', userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    email: email
                });
                this.isLoggedIn = true
                console.log('Utilisateur créé avec succès', this.isLoggedIn);
            } else {
                console.log('Utilisateur déjà existant');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            throw error;
        }
    }
    async signIn(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
           this.isLoggedIn = true
            console.log('Connexion réussie', this.isLoggedIn);

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    }
    async signOut(): Promise<void> {
        try {
            await signOut(this.auth);
            this.isLoggedIn = false
            console.log('Déconnexion réussie', this.isLoggedIn);
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            throw error;
        }
    }
}
