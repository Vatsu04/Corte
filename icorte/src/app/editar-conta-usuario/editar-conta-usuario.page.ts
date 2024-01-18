import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


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
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    endereco: ['', [Validators.required, Validators.minLength(10)]],
    nome: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastController: ToastController,
    private router:Router
  ) {}

  ngOnInit() {}

  get email() {
    return this.credentials.get('email');
  }

  get oldPassword() {
    return this.credentials.get('oldPassword');
  }

  get newPassword() {
    return this.credentials.get('newPassword');
  }

  get cpf() {
    return this.credentials.get('cpf');
  }

  get endereco() {
    return this.credentials.get('endereco');
  }

  get nome() {
    return this.credentials.get('nome');
  }

  async editarPerfil(perfilAtualizado: any) {
    const success = await this.editUserProfile(perfilAtualizado);

    if (success) {
      this.presentToast('User profile updated successfully');

    } else {
      this.presentToast('Failed to update user profile');
    }

    this.editUserPassword(perfilAtualizado);
  }

  async editUserProfile(updatedProfile: any): Promise<boolean> {
    const uid = await this.authService.getCurrentUserUID();

    if (uid) {
      const userProfile = {
        cpf: updatedProfile.cpf,
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

    const success = await this.authService.changeUserPassword(email, oldPassword, newPassword);

    if (success) {
      this.presentToast('Password changed successfully');
      this.router.navigateByUrl('/tab1', { replaceUrl: true });
    } else {
      this.presentToast('Failed to change password');
    }
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
