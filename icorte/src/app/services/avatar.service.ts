import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {doc, docData, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
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

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
  
    if (!user) {
      console.error('User not logged in');
      return null;
    }
  
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
  
    try {
      // Upload the image to storage
      await uploadString(storageRef, cameraFile.base64String ?? '', 'base64');
  
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
  
      // Retrieve the existing user data
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        // Get the existing user fields
        const { nome, cpf, email, endereco } = userDoc.data();
  
        // Update only the imageUrl field and maintain other fields
        await updateDoc(userDocRef, { imageUrl, nome, cpf, email, endereco });
  
        return true;
      } else {
        console.error('User document not found');
        return null;
      }
    } catch (e) {
      console.error('Error uploading image:', e);
      return null;
    }
  }
  



  getBarberProfile(){
    const barber = this.auth.currentUser;
    const barberDocRef = doc(this.firestore, `barbers/${barber?.uid}`);
    return docData(barberDocRef);
  }

  async uploadBarberImage(cameraFile: Photo) {
    const barber = this.auth.currentUser;
  
    if (!barber) {
      console.error('User not logged in');
      return null;
    }
  
    const path = `uploads/${barber.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
  
    try {
      // Upload the image to storage
      await uploadString(storageRef, cameraFile.base64String ?? '', 'base64');
  
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
  
      // Retrieve the existing user data
      const barberDocRef = doc(this.firestore, 'barbers', barber.uid);
      const barberDoc = await getDoc(barberDocRef);
  
      if (barberDoc.exists()) {
        // Get the existing user fields
        const { nome, cpf, emaiL, local_trabalho, especialidades } = barberDoc.data();
  
        // Update only the imageUrl field and maintain other fields
        await updateDoc(barberDocRef, { imageUrl, nome, cpf, emaiL, local_trabalho, especialidades });
  
        return true;
      } else {
        console.error('User document not found');
        return null;
      }
    } catch (e) {
      console.error('Error uploading image:', e);
      return null;
    }
  }
  

  
}

  

