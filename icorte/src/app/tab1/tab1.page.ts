import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData } from '@angular/fire/firestore';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profile: null | DocumentData | undefined = null;
  constructor(
    private avatarService:AvatarService,
    private authService:AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
     
  ) {
    this.avatarService.getUserProfile().subscribe((data) =>{
      this.profile = data;
    });
  }

    

  async logout(){
   await this.authService.logout()
   this.router.navigateByUrl('/', {replaceUrl: true});

  }

  async changeImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });
  
      if (image) {
        const loading = await this.loadingController.create();
        await loading.present();
  
        const result = await this.avatarService.uploadImage(image);
        loading.dismiss();
  
        if (!result) {
          const alert = await this.alertController.create({
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } else {
        // Handle the case where the user canceled the image capture.
        console.log('Image capture canceled');
      }
    } catch (error) {
      // Handle any errors that occurred during the image capture.
      console.error('Error capturing image:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'An error occurred while capturing the image.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
}
