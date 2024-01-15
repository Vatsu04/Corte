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

  async editUserProfile(uid: string, updatedProfile: any): Promise<boolean> {
    try {
      const userDocRef = this.firestore.doc(`users/${uid}`);
      await userDocRef.update(updatedProfile);
  
      return true;
    } catch (error) {
      console.error('Error editing user profile:', error);
      return false;
    }
  }

  async editBarberProfile(uid: string, updatedProfile: any): Promise<boolean> {
    try {
      const userDocRef = this.firestore.doc(`barbers/${uid}`);
      await userDocRef.update(updatedProfile);
  
      return true;
    } catch (error) {
      console.error('Error editing user profile:', error);
      return false;
    }
  }

  async changeUserPassword(email: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, oldPassword);
  
      if (user && user.user) {
        await user.user.updatePassword(newPassword);
        return true;
      } else {
        console.error('Error changing user password: User not found');
        return false;
      }
    } catch (error) {
      console.error('Error changing user password:', error);
      return false;
    }
  }
}
