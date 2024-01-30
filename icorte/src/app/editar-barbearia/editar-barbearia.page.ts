import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Auth, updateEmail, updatePassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-barbearia',
  templateUrl: './editar-barbearia.page.html',
  styleUrls: ['./editar-barbearia.page.scss'],
})
export class EditarBarbeariaPage implements OnInit {
  credentials: FormGroup = this.fb.group({
  
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(10)]],
    especialidade_tipo_cabelo: ['', [Validators.required]],
    especialidade_tamanho_cabelo: ['', [Validators.required]],
    endereco: ['', [Validators.required, Validators.minLength(10)]],

  });
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastController: ToastController,
    private auth: Auth,
    private router: Router

  ) { }

  ngOnInit() {
  }


  async returnToMenu(){
    this.router.navigateByUrl('/menu-barbearia', { replaceUrl: true });
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
  
  get especialidade_tipo_cabelo(){
    return this.credentials.get('especialidade_tipo_cabelo');
  }

  get especialidade_tamanho_cabelo(){
    return this.credentials.get('especialidade_tipo_cabelo');
  }
  
  get endereco() {
    return this.credentials.get('endereco');
  }
  
  get nome() {
    return this.credentials.get('nome');
  }

  async editBarberShopProfile(updatedProfile: any) {
    const uid = await this.authService.getCurrentUserUID();

    if (uid) {
      const userProfile = {
      
        local_trabalho: updatedProfile.local_trabalho,
        nome: updatedProfile.nome,
        email: updatedProfile.email,
        especialidades: updatedProfile.especialidades,
        data_nascimento: updatedProfile.data_nascimento
      };

      const success = await this.authService.editBarberProfile(uid, userProfile);

      if (success) {
        console.log('User profile updated successfully');
        
      } else {
        console.error('Failed to update user profile');
      }
    }
  }


  async editBarberPassword(updatedProfile: any) {
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
