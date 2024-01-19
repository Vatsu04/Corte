import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { DataMaskDirective } from './data-mask.directive';
import { CpfMaskDirective } from './cpf-mask.directive';


@NgModule({
  declarations: [AppComponent, CpfMaskDirective, DataMaskDirective],
  imports:
   [BrowserModule,
    AngularFirestoreModule,
AngularFireAuthModule,

     IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp({"projectId":"icorte-5cc11",
      "appId":"1:575713557136:web:cf0cf6ffb31f415f8bf615",
      "storageBucket":"icorte-5cc11.appspot.com",
      "apiKey":"AIzaSyD2EBvWefIqpQJj-ueARMOckRqPw5ziOYg",
      "authDomain":"icorte-5cc11.firebaseapp.com",
      "messagingSenderId":"575713557136",
      "measurementId":"G-JNWVZ7YL5Y"}),
              provideAuth(() => getAuth()),
               provideFirestore(() => getFirestore()),
                provideStorage(() => getStorage()), 
                provideFirebaseApp(() => initializeApp({"projectId":"icorte-5cc11",
                "appId":"1:575713557136:web:cf0cf6ffb31f415f8bf615",
                "storageBucket":"icorte-5cc11.appspot.com",
                "apiKey":"AIzaSyD2EBvWefIqpQJj-ueARMOckRqPw5ziOYg",
                "authDomain":"icorte-5cc11.firebaseapp.com",
                "messagingSenderId":"575713557136",
                "measurementId":"G-JNWVZ7YL5Y"}))],
      
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
