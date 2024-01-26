import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cadastro-barbearia',
  templateUrl: './cadastro-barbearia.page.html',
  styleUrls: ['./cadastro-barbearia.page.scss'],
  
  
})
export class CadastroBarbeariaPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    
   
    endereco: ['', [Validators.required, Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cep: ['', [Validators.required]],
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




  get cep() {
    return this.credentials.get('cpf');
  }

 

  get endereco() {
    return this.credentials.get('endereco');
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
    
   
      endereco: ['', [Validators.required, Validators.minLength(6)]],
      nome: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cep: ['', [Validators.required]],
    });
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    
}

}