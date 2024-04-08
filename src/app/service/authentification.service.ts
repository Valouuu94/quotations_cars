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
                    // Enregistrement des données utilisateur dans Firestore
                    this.firestore.collection('users').doc(response.user?.uid).set({
                        email: email,
                        // Ajoutez ici d'autres données utilisateur si nécessaire
                    }).then(() => {
                        // Succès de l'enregistrement
                        resolve();
                    }).catch(error => {
                        // Gestion des erreurs lors de l'enregistrement dans Firestore
                        console.error('Erreur lors de l\'enregistrement des données utilisateur :', error);
                        reject(error);
                    });
                })
                .catch(error => {
                    // Gestion des erreurs lors de la création de compte
                    console.error('Erreur lors de la création de compte :', error);
                    reject(error);
                });
        });
    }
}
