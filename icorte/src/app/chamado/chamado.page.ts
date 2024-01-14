import { Component, OnInit } from '@angular/core';
import { CatalogoPage } from '../catalogo/catalogo.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Storage, uploadBytes, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.page.html',
  styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    local: ['', [Validators.required]],
   
  });
  barber:any = [{nome: CatalogoPage.barber.nome, email: CatalogoPage.barber.email}];
  chamado:any =[];
  usuarios: any = [{email:'', nome:''}];
  foto: any;
  imageRef:any;
  imgSrc:any;
  isImg: boolean=false;
  images:any = [];
  
  constructor(
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.listarBanco;
    this.credentials = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      local: ['', [Validators.required]],
     
    });
  }
  async chamarBabeiro() {
  

      const chamado = {
        imageUrl: this.imgSrc, // Update this line
        nomeCliente: this.usuarios.nome,
        emailCliente: this.usuarios.email,
        nomeBarbeiro: this.barber.nome,
        emailBarbeiro: this.barber.email,
        descricao: this.descricao,
        local: this.local
      };
  
      const document = doc(collection(this.firestore, 'chamados'));
      try {
        await setDoc(document, chamado);
        console.log('Chamado added successfully');
      } catch (error) {
        console.error('Error adding chamado:', error);
      }
    
  }
  


  get descricao() {
    return this.credentials.get('descricao');
  }

  get local(){
    return this.credentials.get('local');
  }



  carregarFoto(e: any){
    this.foto = e.target.files[0];
    const newName = uuidv4(this.foto.name);
    this.imageRef = ref(this.storage, ``);
    uploadBytes(this.imageRef, this.foto);
    setTimeout(() => {
      this.images=[];
      
    }, 2000)
}

  selectImage(img: any, modal: any){
    this.imgSrc = img;
    this.isImg = true;
    modal.dismiss();
  }  


  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "users", userUID));

      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'] }];
        console.log(this.usuarios[0]?.nome);
    console.log(this.usuarios[0]?.email);
      } else {
        
        this.router.navigateByUrl('/tab3', {replaceUrl:true});
      }
    } else {
      console.error('User UID not available');
    }
  }
}

