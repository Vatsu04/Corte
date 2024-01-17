import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {}


  get email()  {
    return this.credentials.get('email');
  }
  
  get oldPassword()  {
    return this.credentials.get('oldPassword');
  }
  
  get newPassword()  {
    return this.credentials.get('newPassword');
  }
  
  get cpf()  {
    return this.credentials.get('cpf');
  }
  
  get endereco()  {
    return this.credentials.get('endereco');
  }
  
  get nome()  {
    return this.credentials.get('nome');
  }
  async editarPerfil(perfilAtualizado: any) {
    this.editUserProfile(perfilAtualizado);
    this.editUserPassword(perfilAtualizado);
  }

  async editUserProfile(updatedProfile: any) {
    const uid = await this.authService.getCurrentUserUID();

    if (uid) {
      const userProfile = {
        cpf: updatedProfile.cpf,
        endereco: updatedProfile.endereco,
        nome: updatedProfile.nome,
        email: updatedProfile.email,
      };

      const success = await this.authService.editUserProfile(uid, userProfile);

      if (success) {
        console.log('User profile updated successfully');
      } else {
        console.error('Failed to update user profile');
      }
    }
  }

  async editUserPassword(updatedProfile: any) {
    const email = updatedProfile.email;
    const oldPassword = updatedProfile.oldPassword;
    const newPassword = updatedProfile.newPassword;

    const success = await this.authService.changeUserPassword(email, oldPassword, newPassword);

    if (success) {
      console.log('Password changed successfully');
    } else {
      console.error('Failed to change password');
    }
  }
}
