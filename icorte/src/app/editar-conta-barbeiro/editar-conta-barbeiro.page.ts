import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-conta-barbeiro',
  templateUrl: './editar-conta-barbeiro.page.html',
  styleUrls: ['./editar-conta-barbeiro.page.scss'],
})
export class EditarContaBarbeiroPage implements OnInit {

  editedUser: any = [];
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(10)]],
    especialidade_tipo_cabelo: ['', [Validators.required]],
    especialidade_tamanho_cabelo: ['', [Validators.required]],
    local_trabalho: ['', [Validators.required, Validators.minLength(10)]],
    data_nascimento: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
  
  
  get local_trabalho() {
    return this.credentials.get('local_trabalho');
  }
  
  get data_nascimento() {
    return this.credentials.get('data_nascimento');
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

  async editUserPassword(updatedProfile: any) {
    const email = updatedProfile.email;
    const oldPassword = updatedProfile.oldPassword;
    const newPassword = updatedProfile.newPassword;

    const success = await this.authService.changeUserPassword(email, oldPassword, newPassword);

    if (success) {
      console.log('Password changed successfully');
      this.router.navigateByUrl('/tab3', { replaceUrl: true });
    } else {
      console.error('Failed to change password');
    }
  }

  
async returnToMenu(){
  this.router.navigateByUrl('/tab3', { replaceUrl: true });
}
}
