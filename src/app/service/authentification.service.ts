import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore
    ) { }

    register(email: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then(response => {
                    this.firestore.collection('users').doc(response.user?.uid).set({
                        email: email,
                    }).then(() => {
                        resolve();
                    }).catch(error => {
                        console.error('Erreur lors de l\'enregistrement des données utilisateur :', error);
                        reject(error);
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la création de compte :', error);
                    reject(error);
                });
        });
    }

    signIn(email: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Connexion réussie
                    resolve();
                })
                .catch(error => {
                    // Gestion des erreurs lors de la connexion
                    console.error('Erreur lors de la connexion :', error);
                    reject(error);
                });
        });
    }
}
