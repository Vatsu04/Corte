import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder

  ) { }

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

  async editUserProfile(updatedProfile: any) {
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
}
