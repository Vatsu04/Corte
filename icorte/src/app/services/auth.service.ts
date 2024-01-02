import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import {Photo} from '@capacitor/camera';
import {Storage} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
    ) {}


    getUserProfile(){
      const user = this.auth.currentUser;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      return docData(userDocRef);
    }
    
  async register ({email, password}: { email: string, password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch(e) {
      return null;
    }
  }

  async login ({email, password}: { email: string, password: string }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch(e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
