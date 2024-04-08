import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

   const firebaseConfig = {
        apiKey: "AIzaSyAUA7JFLy_2a745gK56Q0-dzhBOwyjHHns",
        authDomain: "quotation-e72e8.firebaseapp.com",
        projectId: "quotation-e72e8",
        storageBucket: "quotation-e72e8.appspot.com",
        messagingSenderId: "446307526906",
        appId: "1:446307526906:web:acf5a783a6d78b3d018143"
    };
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
            importProvidersFrom([
            provideFirebaseApp(() => initializeApp(firebaseConfig),
            provideAuth(() => getAuth()))])],
};
