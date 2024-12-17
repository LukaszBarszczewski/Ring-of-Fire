import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-e0b06","appId":"1:845920475794:web:9ae1fc4350a0644141644b","storageBucket":"ring-of-fire-e0b06.firebasestorage.app","apiKey":"AIzaSyBN1UOwZlxR1e1oBjYEmCxkmxJpcAyN-uI","authDomain":"ring-of-fire-e0b06.firebaseapp.com","messagingSenderId":"845920475794"})), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())]
};
