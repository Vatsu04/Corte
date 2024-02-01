import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    endereco: ['', [Validators.required, Validators.minLength(10)]],
    tipo_cabelo: ['', [Validators.required]],
    tamanho_cabelo: ['', [Validators.required]],
    nome: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get tipo_cabelo(){
    return this.credentials.get('tipo_cabelo');
  }

  get tamanho_cabelo(){
    return this.credentials.get('tamanho_cabelo');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
  
  get cpf() {
    return this.credentials.get('cpf');
  }

  get endereco() {
    return this.credentials.get('endereco');
  }

  get foto() {
    return this.credentials.get('foto');
  }

  get nome() {
    return this.credentials.get('nome');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      endereco: ['', [Validators.required, Validators.minLength(10)]],
      tipo_cabelo: ['', [Validators.required]],
    tamanho_cabelo: ['', [Validators.required]],
    nome: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.registerWithProfile(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tab1', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again, try a different email!');
    }
  }
 

/*   async cadastroBarbeiro(){
    this.router.navigateByUrl('/cadastro-barbeiro', { replaceUrl: true });
  } */

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
