import { Component, OnInit } from '@angular/core';
import { CatalogoPage } from '../catalogo/catalogo.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Storage, uploadBytes, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { NgModel } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chamar-barbearia',
  templateUrl: './chamar-barbearia.page.html',
  styleUrls: ['./chamar-barbearia.page.scss'],
})
export class ChamarBarbeariaPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    local: ['', [Validators.required]],
    data: ['', Validators.required ],
    hora: ['', Validators.required]
  });
  teste:any = [];
  testePedidos:any = [];
  chamado:any =[];
  pedidos_aceitos: any=[];
  chamados_feitos: any =[];
  usuarios: any = [{email:'', nome:''}];
  foto: any;
  imageRef:any;
  imgSrc:any;
  isImg: boolean=false;
  images:any = [];
  foto_: any;
  imageRef_:any;
  imgSrc_:any;
  isImg_: boolean=false;
  images_:any = [];
  barbearia: any = { nome: '', email: '', cep:'', endereco:'' };



  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private storage_: Storage,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.barbearia = history.state.barbearia || {nome:'', email:'', cep:'', endereco: ''};
    console.log(this.barbearia.nome);
    console.log(this.barbearia.email);
    console.log(this.barbearia.cep);
    console.log(this.barbearia.endereco);
    await this.listarBanco();
    this.listarChamados();
    this.listarPedidos();
  }

  

  
  async chamarBabearia() {

    if (!this.imgSrc || !this.imgSrc_) {
      const toast = await this.toastController.create({
        message: 'Por favor carregue uma imagem exemplo do seu corte desejado e do seu corte atual',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    }
    console.log(this.pedidos_aceitos)
    console.log(this.usuarios[0].cpf)

    for(let i=0;i<this.pedidos_aceitos.length;i++){
    if(this.pedidos_aceitos[i].cpfCliente === this.usuarios[0].cpf){
      const toast = await this.toastController.create({
        message: 'Não é permitido o mesmo usuário fazer mais de um pedido de uma vez só',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    }
  }
  for(let i=0;i<this.chamados_feitos.length;i++){
   if( this.chamados_feitos[i].cpfCliente === this.usuarios[0].cpf){
    const toast = await this.toastController.create({
      message: 'Não é permitido o mesmo usuário fazer mais de um pedido de uma vez só',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
    return;

  }
  }

  if(this.local?.value === "Moradia do Cliente"){   
    const chamado = {
      corteAtual: this.imgSrc_,
      imageUrl: this.imgSrc,
      nomeCliente: this.usuarios[0].nome,
      emailCliente: this.usuarios[0].email,
      cpfCliente: this.usuarios[0].cpf,
      nomeBarbearia: this.barbearia.nome,
      emailBarbearia: this.barbearia.email,
      cep: this.barbearia.cep,
      descricao: this.descricao?.value,
      local: this.usuarios[0].endereco,
      data: this.data?.value,
      hora: this.hora?.value
    };

    const document = doc(collection(this.firestore, 'chamados'));
    try {
      await setDoc(document, chamado);
      console.log('Chamado added successfully');
      const toast = await this.toastController.create({
        message: 'Chamado enviado para a barbearia',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/tab1']);
      return;
    } catch (error) {
      console.error('Error adding chamado:', error);
    }
  } else{
    const chamado = {
      corteAtual: this.imgSrc_,
      imageUrl: this.imgSrc,
      nomeCliente: this.usuarios[0].nome,
      emailCliente: this.usuarios[0].email,
      cpfCliente: this.usuarios[0].cpf,
      nomeBarbearia: this.barbearia.nome,
      emailBarbearia: this.barbearia.email,
      cep: this.barbearia.cep,
      descricao: this.descricao?.value,
      local: this.barbearia.endereco,
      data: this.data?.value,
      hora: this.hora?.value
    };

    const document = doc(collection(this.firestore, 'chamados'));
    try {
      await setDoc(document, chamado);
      console.log('Chamado added successfully');
      const toast = await this.toastController.create({
        message: 'Chamado enviado para o barbeiro',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/tab1']);
      return;
    } catch (error) {
      console.error('Error adding chamado:', error);
    }
  }
  }


  get descricao() {
    return this.credentials.get('descricao');
  }

  get local(){
    return this.credentials.get('local');
  }

  get data(){
    return this.credentials.get('data');
  }

  get hora(){
    return this.credentials.get('hora');
  }


  async listarChamados() {
    let i = 0;
    const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
    this.teste = []; // Clear the array before populating it

  
    querySnapshot.forEach((doc) => {
      
      this.teste = [...this.teste, { 
      id: doc.id,
      corteAtual: doc.data()['corteAtual'],
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      cpfCliente: doc.data()['cpfCliente'],
      nomeBarbeiro: doc.data()['nomeBarbearia'], 
      emailBarbeiro: doc.data()['emailBarbearia'],
      cep: doc.data()['cep'],
      descricao: doc.data()['descricao'],
      hora: doc.data()['hora'],
      data: doc.data()['data'],
      local: doc.data()['local'], 
      preco: doc.data()['preco'],
      imageUrl: doc.data()['imageUrl'] }]
    });
    for(i;i< this.teste.length;i++){
      if(this.teste[i].cpfCliente == this.usuarios[0].cpf){
        this.chamados_feitos.push(this.teste[i]);
      }
    }
    


    }

    async listarPedidos() {
      let i = 0;
      const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
      this.testePedidos = []; // Clear the array before populating it
  
    
      querySnapshot.forEach((doc) => {
        
        this.testePedidos = [...this.teste, { 
        id: doc.id,
        corteAtual: doc.data()['corteAtual'],
        nomeCliente: doc.data()['nomeCliente'], 
        emailCliente: doc.data()['emailCliente'],
        cpfCliente: doc.data()['cpfCliente'],
        nomeBarbeiro: doc.data()['nomeBarbeiro'], 
        emailBarbeiro: doc.data()['emailBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro'],
        descricao: doc.data()['descricao'],
        hora: doc.data()['hora'],
        data: doc.data()['data'],
        local: doc.data()['local'], 
        preco: doc.data()['preco'],
        imageUrl: doc.data()['imageUrl'] }]
      });
  

      for(i;i< this.testePedidos.length;i++){
        if(this.testePedidos[i].cpfCliente == this.usuarios[0].cpf){
          this.pedidos_aceitos.push(this.testePedidos[i]);
        }
      }

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

  
  async carregarFoto_(e: any) {
    this.foto_ = e.target.files[0];
    const newName = uuidv4(this.foto_.name);
    this.imageRef_ = ref(this.storage_, `path/to/${newName}`);
    
    try {
      await uploadBytes(this.imageRef_, this.foto_);
      this.imgSrc_ = await getDownloadURL(this.imageRef_);
      this.images_.push(this.imgSrc_); // Add the uploaded image to the array
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  selectImage_(img: any, modal: any){
    this.imgSrc_ = img;
    this.isImg_ = true;
    modal.dismiss();
  }  




  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "users", userUID));

      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.usuarios = [{
           nome: userDoc.data()['nome'],
         email: userDoc.data()['email'],
         cpf: userDoc.data()['cpf'],
        endereco: userDoc.data()['endereco'] }];
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

  hide_show(){
    document.getElementById('cadImg_')?.click()
  }
}

