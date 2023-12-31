import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import from 'compat' namespace
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@angular/fire/storage';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import from 'compat' namespace

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth2: Auth,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {}





  



  async registerBarber(credentials: any) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );

      const userDocRef = this.firestore.doc(`barbers/${userCredential.user?.uid}`);
      await userDocRef.set({
        emaiL: credentials.email,
        cpf: credentials.cpf,
        especialidades: credentials.especialidades,
      
        nome: credentials.nome,
        local_trabalho: credentials.local_trabalho,
        data_nascimento: credentials.data_nascimento
        
      });

      return userCredential.user;
    } catch (error) {
      console.error('Error registering user with profile:', error);
      return null;
    }
  }

  async registerWithProfile(credentials: any) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );

      const userDocRef = this.firestore.doc(`users/${userCredential.user?.uid}`);
      await userDocRef.set({
        email: credentials.email,
        cpf: credentials.cpf,
        endereco: credentials.endereco,
        
        nome: credentials.nome
        // Add more fields as needed
      });

      return userCredential.user;
    } catch (error) {
      console.error('Error registering user with profile:', error);
      return null;
    }
  }


  async login ({email, password}: { email: string, password: string }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth2,
        email,
        password
      );
      return user;
    } catch(e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth2);
  }
  getCurrentUserUID(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
 
  }
}
