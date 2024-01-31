import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cadastro-barbeiro',
  templateUrl: './cadastro-barbeiro.page.html',
  styleUrls: ['./cadastro-barbeiro.page.scss'],
  
  
})
export class CadastroBarbeiroPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    data_nascimento: ['', [Validators.required, Validators.minLength(6)]],
    especialidade_tipo_cabelo: ['', [Validators.required]],
    especialidade_tamanho_cabelo: ['', [Validators.required]],
    local_trabalho: ['', [Validators.required, Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
  });

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get especialidade_tipo_cabelo(){
    return this.credentials.get('especialidade_tipo_cabelo');
  }

 get especialidade_tamanho_cabelo() {
  return this.credentials.get('especialidade_tamanho_cabelo');
}


  get cpf() {
    return this.credentials.get('cpf');
  }

  get data_nascimento() {
    return this.credentials.get('data_nascimento');
  }



  get foto() {
    return this.credentials.get('foto');
  }

  get local_trabalho() {
    return this.credentials.get('local_trabalho');
  }

  get nome() {
    return this.credentials.get('nome');
  }


  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.registerBarber(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tab3', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  
  ngOnInit() {
    this.credentials = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    data_nascimento: ['', [Validators.required, Validators.minLength(6)]],
    especialidade_tipo_cabelo: ['', [Validators.required]],
    especialidade_tamanho_cabelo: ['', [Validators.required]],
    local_trabalho: ['', [Validators.required, Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    });
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    
}



  async returnTo(){
    this.router.navigateByUrl('/', { replaceUrl: true });
  }


}