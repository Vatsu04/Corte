import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import {Photo} from '@capacitor/camera';
import {Storage, ref} from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable, uploadString } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
    ) {}


    
    
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
