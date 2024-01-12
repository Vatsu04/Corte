import { Component, OnInit } from '@angular/core';
import { CatalogoPage } from '../catalogo/catalogo.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Firestore } from 'firebase/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.page.html',
  styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    local: ['', [Validators.required]],
   
  });
  barber:any = [{nome: CatalogoPage.barber.nome, email: CatalogoPage.barber.email}]
  chamado:any =[]
  usuarios: any = [{email:'', nome:''}];
  constructor(
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      local: ['', [Validators.required]],
     
    });
  }
  async chamarBabeiro(){
    this.listarBanco();
    if(await this.verificarImagem() == true)  {
      console.log("Imagem obrigatória!"); 
    }
    else{
      const chamado ={
        imageUrl: this.chamado.foto,
        nomeCliente:  this.usuarios.nome,
        emailCliente: this.usuarios.email,
        nomeBarbeiro: this.barber.nome,
        emailBarbeiro: this.barber.email,
        descricao: this.descricao,
        local: this.local
      }
      const document = doc(collection(this.firestore, 'chamados'));
      return setDoc(document, chamado)
    }
    
  }


  get descricao() {
    return this.credentials.get('descricao');
  }

  get local(){
    return this.credentials.get('local');
  }

  async verificarImagem() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "chamados", userUID));

      if (userDoc.exists()) {
      
        this.chamado = [{foto: userDoc.data()['imageUrl'] }];
        if(this.chamado.foto == null || "" || undefined){
          return false;
        } else{
          return true;
        }
      } else{
        return false;
      }
  } else{
    return false;
  }


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

        const result = await this.avatarService.uploadChamadoImage(image);
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
  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "users", userUID));

      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'] }];
        console.log(this.usuarios[0]?.nome);
    console.log(this.usuarios[0]?.email);
      } else {
        
        this.router.navigateByUrl('/tab3', {replaceUrl:true});
      }
    } else {
      console.error('User UID not available');
    }
  }
}
