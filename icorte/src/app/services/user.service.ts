import { Injectable, Inject, InjectionToken } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root',
  })
// Define an InjectionToken for Auth


export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    
    
  ) {}

  


  async getCpf(): Promise<string | null> {
    return this.getFieldValue('cpf');
  }

 

 

  async getFieldValue(fieldName: string): Promise<string | null> {
    try {
      const userUID = this.authService.getCurrentUserUID();

      if (userUID) {
        const userDoc = await this.firestore.doc(`users/${userUID}`).get().toPromise();

        if (userDoc && userDoc.exists) {
          const fieldData = userDoc.get(fieldName);
          return fieldData !== undefined ? String(fieldData) : null;
        } else {
          console.error('User document not found');
          return null;
        }
      } else {
        console.error('User UID not available');
        return null;
      }
    } catch (error) {
      console.error(`Error fetching ${fieldName} from user profile:`, error);
      return null;
    }
  }



async getNome(): Promise<string | null> {
    try {
      const userUID = this.authService.getCurrentUserUID();

      if (userUID) {
        const userDoc = await this.firestore.doc(`users/${userUID}`).get().toPromise();

        if (userDoc && userDoc.exists) {
          return userDoc.get('nome') as string;
        } else {
          console.error('User document not found');
          return null;
        }
      } else {
        console.error('User UID not available');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }


async getEmail(): Promise<string | null> {
    try {
      const userUID = this.authService.getCurrentUserUID();

      if (userUID) {
        const userDoc = await this.firestore.doc(`users/${userUID}`).get().toPromise();

        if (userDoc && userDoc.exists) {
          return userDoc.get('email') as string;
        } else {
          console.error('User document not found');
          return null;
        }
      } else {
        console.error('User UID not available');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }


async getEndereco(): Promise<string | null> {
    try {
      const userUID = this.authService.getCurrentUserUID();

      if (userUID) {
        const userDoc = await this.firestore.doc(`users/${userUID}`).get().toPromise();

        if (userDoc && userDoc.exists) {
          return userDoc.get('endereco') as string;
        } else {
          console.error('User document not found');
          return null;
        }
      } else {
        console.error('User UID not available');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
}