import { Component, OnInit } from '@angular/core';
import { CatalogoPage } from '../catalogo/catalogo.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Storage, uploadBytes, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { NgModel } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.page.html',
  styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    local: ['', [Validators.required]],
    dataHora: ['', Validators.required ]
  });
 
  chamado:any =[];
  usuarios: any = [{email:'', nome:''}];
  foto: any;
  imageRef:any;
  imgSrc:any;
  isImg: boolean=false;
  images:any = [];
  barber: any = { nome: '', email: '', cpf:'' };
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.barber = history.state.barber || { nome: '', email: '', cpf:'' };
    console.log(this.barber.nome);
    console.log(this.barber.email);
    console.log(this.barber.cpf);
    this.listarBanco();
  }

  

  
  async chamarBabeiro() {

    if (!this.imgSrc) {
      const toast = await this.toastController.create({
        message: 'Por favor carregue uma imagem exemplo do seu corte desejado',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    }

    const chamado = {
      imageUrl: this.imgSrc,
      nomeCliente: this.usuarios[0].nome,
      emailCliente: this.usuarios[0].email,
      cpfCliente: this.usuarios[0].cpf,
      nomeBarbeiro: this.barber.nome,
      emailBarbeiro: this.barber.email,
      cpfBarbeiro: this.barber.cpf,
      descricao: this.descricao?.value,
      local: this.local?.value,
      horario: this.dataHora?.value
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

  get dataHora(){
    return this.credentials.get('dataHora');
  }



  async carregarFoto(e: any) {
    this.foto = e.target.files[0];
    const newName = uuidv4(this.foto.name);
    this.imageRef = ref(this.storage, `path/to/${newName}`);
    
    try {
      await uploadBytes(this.imageRef, this.foto);
      this.imgSrc = await getDownloadURL(this.imageRef);
      this.images.push(this.imgSrc); // Add the uploaded image to the array
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'], cpf: userDoc.data()['cpf'] }];
        console.log(this.usuarios[0]?.nome);
    console.log(this.usuarios[0]?.email);
      } else {
        
        this.router.navigateByUrl('/tab3', {replaceUrl:true});
      }
    } else {
      console.error('User UID not available');
    }
  }
  hideShow(){
    document.getElementById('cadImg')?.click()
  }
}

