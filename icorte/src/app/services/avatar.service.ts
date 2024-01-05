import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {doc, docData, DocumentData, Firestore, setDoc} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import {Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo){
    const user = this.auth.currentUser;
    const path = `uploads/${user?.uid}/profile.png`;
    const storageRef = ref(this.storage, path);


    try{
      await uploadString(storageRef, cameraFile.base64String ?? '', 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user?.uid}`);
      await setDoc(userDocRef, {
        imageUrl
      });
      return true;
    }catch(e){
      return null;
    }
  }

  async updateUserProfile(uid: string, newData: Partial<DocumentData>) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    
    try {
      await setDoc(userDocRef, newData, { merge: true });
      return true; 
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false; 
    }
  }
}
