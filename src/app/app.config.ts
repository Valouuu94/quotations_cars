import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {firebaseConfig} from '../environment/environnement'

export const appConfig: ApplicationConfig = {
  providers: [{ provide: FIREBASE_OPTIONS, useValue: firebaseConfig},
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()],
};
