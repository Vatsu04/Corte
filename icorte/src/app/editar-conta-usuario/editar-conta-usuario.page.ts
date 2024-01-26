import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, getAuth, onAuthStateChanged, updateEmail, updatePassword } from '@angular/fire/auth';


@Component({
  selector: 'app-editar-conta-usuario',
  templateUrl: './editar-conta-usuario.page.html',
  styleUrls: ['./editar-conta-usuario.page.scss'],
})
export class EditarContaUsuarioPage implements OnInit {
  editedUser: any = [];
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    endereco: ['', [Validators.required, Validators.minLength(10)]],
    tipo_cabelo:  ['', Validators.required],
    tamanho_cabelo: ['', Validators.required],
    nome: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    
    private auth: Auth,
    private toastController: ToastController,
    private router:Router
  ) {}

  ngOnInit() {
   
  }

  get email() {
    return this.credentials.get('email');
  }

  get oldPassword() {
    return this.credentials.get('oldPassword');
  }

  get newPassword() {
    return this.credentials.get('newPassword');
  }

  get endereco() {
    return this.credentials.get('endereco');
  }

  get nome() {
    return this.credentials.get('nome');
  }

  get tamanho_cabelo(){
    return this.credentials.get('tamanho_cabelo');
  }

  get tipo_cabelo(){
    return this.credentials.get('tipo_cabelo');
  }

  async editarPerfil(perfilAtualizado: any) {
    const success = await this.editUserProfile(perfilAtualizado);

    if (success) {
      this.presentToast('User profile updated successfully');

    } else {
      this.presentToast('Failed to update user profile');
    }


  }

  async editUserProfile(updatedProfile: any): Promise<boolean> {
    const uid = await this.authService.getCurrentUserUID();

    if (uid) {
      const userProfile = {
        tamanho_cabelo: updatedProfile.tamanho_cabelo,
        tipo_cabelo: updatedProfile.tipo_cabelo,
        endereco: updatedProfile.endereco,
        nome: updatedProfile.nome,
        email: updatedProfile.email,
      };

      return this.authService.editUserProfile(uid, userProfile);
    }

    return false;
  }

  async editUserPassword(updatedProfile: any) {
    const email = updatedProfile.email;
    const oldPassword = updatedProfile.oldPassword;
    const newPassword = updatedProfile.newPassword;

  

const user:any = this.auth.currentUser;


    updatePassword(user, newPassword).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
 
updateEmail(user, email).then(() => {
  // Email updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'dark', // You can change the color based on your preference
    });

    toast.present();
  }
}
