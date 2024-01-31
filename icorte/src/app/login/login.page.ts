import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarios:any = [];
  credentials: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
   
  });

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore
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
     
    }); // Campos Email e Senha obrigatórios, se não o botão não funciona
  }

 

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
  
    if (user) {
      const userUID = await this.authService.getCurrentUserUID();
  
      if (userUID) {
        const userDoc = await getDoc(doc(this.firestore, "users", userUID));
  
        if (userDoc.exists()) {
          console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
          this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'], cpf: userDoc.data()['cpf'] }];
          console.log(this.usuarios[0]?.nome);
          console.log(this.usuarios[0]?.email);
          this.router.navigateByUrl('/tab1', { replaceUrl: true });
        } else {
          const userDoc2 = await getDoc(doc(this.firestore, "barbers", userUID));
          if (userDoc2.exists()) {
            this.router.navigateByUrl('/tab3', { replaceUrl: true });
          } else {
            this.router.navigateByUrl('/menu-barbearia', { replaceUrl: true });
          }
        }
      } else {
        console.error('User UID not available');
      }
    } else {
      this.showAlert('Login failed', 'Please try again!');
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
