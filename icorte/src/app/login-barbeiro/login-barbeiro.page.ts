import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login-barbeiro',
  templateUrl: './login-barbeiro.page.html',
  styleUrls: ['./login-barbeiro.page.scss'],
})
export class LoginBarbeiroPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cpf: ['', [Validators.required, Validators.email]],
    especialidades: ['', [Validators.required, Validators.email]],
    data_nascimento: ['', [Validators.required, Validators.email]],
    nome: ['', [Validators.required, Validators.email]],
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
  
  get cpf() {
    return this.credentials.get('cpf');
  }

  get especialidades() {
    return this.credentials.get('especialidades');
  }

  get data_nascimento() {
    return this.credentials.get('data_nascimento');
  }

  get nome() {
    return this.credentials.get('nome');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.email]],
      especialidades: ['', [Validators.required, Validators.email]],
      data_nascimento: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required, Validators.email]],
    });
  }

 

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tab3', { replaceUrl: true });
    } else {
      this.showAlert('Login falho', 'Por favor tente novamente!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
