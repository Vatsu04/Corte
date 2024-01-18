import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  profile: null | DocumentData | undefined = null;
  barbeiros:any = [{nome:'', data_nascimento:'', email:'', especialidades:'', local_trabalho:'', cpf:'', foto:'', uid:''}]
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private firestore: Firestore
  ) {
    this.avatarService.getBarberProfile().subscribe((data) => {
      this.profile = data;
    });
  }
  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));

      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbeiros = [{ nome: userDoc.data()['nome'],
         email: userDoc.data()['emaiL'], //Email com 2 Ls
         especialidades: userDoc.data()['especialidades']  }];
        console.log(this.barbeiros[0]?.nome);
    console.log(this.barbeiros[0]?.email);
      } else {
        console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
        this.router.navigateByUrl('/login-barbeiro', { replaceUrl: true }); // Provavelmente vou mudar as duas páginas de login para uma página de login universal, mas ainda vou testar
      }
    } else {
      console.error('User UID not available');
    }
    
  }
  

  ngOnInit() {
    this.listarBanco();
    
   
  }



  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
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

        const result = await this.avatarService.uploadBarberImage(image);
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
   
        console.log('Image capture canceled');
      }
    } catch (error) {
   
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

