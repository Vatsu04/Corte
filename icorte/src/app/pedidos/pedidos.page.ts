import { Component, OnInit, Injectable } from '@angular/core';

import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})


export class PedidosPage implements OnInit {
  
  pedidos: any = [];
  usuarios: any = [{email:'', nome:''}];
  barbeiros:any = [{nome:'',  email:'', especialidades:''}]
  teste:any = [];
  isModalOpen = false;
  isToastOpen = false;

  credentials: FormGroup = this.fb.group({
    preco: ['', [Validators.required, Validators.minLength(2), this.isValidFloat]],
  });
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  
  async initializePage() {
    await this.listarBanco();
    await this.listarChamados();
    console.log(this.pedidos);
  }

  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  message(isOpen: boolean){
    this.isToastOpen = isOpen;
  }

    isValidFloat(control: AbstractControl): { [key: string]: any } | null {
    const floatValue = parseFloat(control.value);
  
    if (isNaN(floatValue)) {
      return { 'invalidFloat': true };
    }
  
    return null;
  }


  async listarChamados() {
    const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
    this.teste = []; // Clear the array before populating it

  
    querySnapshot.forEach((doc) => {
      
      this.teste.push({ 
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
      imageUrl: doc.data()['imageUrl']
    });
  });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfBarbeiro)
      console.log(this.barbeiros[0].cpf)
      if(this.teste[i].cpfBarbeiro === this.barbeiros[0].cpf){
        this.pedidos.push(this.teste[i]);
      }
    }
    }
  

get preco() {
  return this.credentials.get('preco');
}


async listarBanco() {
  const userUID = await this.authService.getCurrentUserUID();
 
  if (userUID) {
    const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));

    if (userDoc.exists()) {
      console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
      this.barbeiros = [{ nome: userDoc.data()['nome'],
       email: userDoc.data()['emaiL'], 
       especialidades: userDoc.data()['especialidades'],
       endereco: userDoc.data()['endereco'],
       cpf: userDoc.data()['cpf']  }];
     
    } else {
      console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
      this.router.navigateByUrl('/', { replaceUrl: true }); // Provavelmente vou mudar as duas páginas de login para uma página de login universal, mas ainda vou testar
    // const userDoc2 = await getDoc(doc(this.firestore, "barberShops", userUID));
    }
  } else {
    console.error('User UID not available');
  }
  return Promise.resolve(); // Resolve the promise when the function completes
  
}


async negarPedido(isOpen:boolean, id:string){
  await deleteDoc(doc(this.firestore, "chamados", id));
  
  
  // Wait for a short time to allow Firebase to process the deletion
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  this.pedidos = [];
  await this.listarBanco();

  // Reload the current route to refresh the page
  this.router.navigateByUrl('/tab3', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/pedidos']);
  });
}

async negar(isOpen:boolean, id:string){
  this.negarPedido(isOpen, id);
  const toast = await this.toastController.create({
    message: 'Pedido negado.',
    duration: 2000,
    color: 'danger',
    position: 'top'
  });
  toast.present();
}

/*
async aceitarPedido(foto: string, foto2: string, _nomeCliente: string, _emailCliente: string,
   _nomeBarbeiro: string, _emailBarbeiro: string, hora: string, data: string,
   _descricao: string, _local:string, credentials: any, cpfBarbeiro:string, isOpen:boolean, id:string, cpf:string){
*/

async aceitarPedido(foto: string, foto2: string, _nomeCliente: string, _emailCliente: string,
   _nomeBarbeiro: string, _emailBarbeiro: string, hora: string, data: string,
   _descricao: string, _local:string, credentials: any, cpfBarbeiro:string, isOpen:boolean, id:string, cpf:string){
  
  if(_local === "Local de Trabalho"){
    _local = this.barbeiros[0].endereco
  } 
  const pedido = {
    hora: hora,
    data: data,
    corteAtual: foto2,
    cpfCliente: cpf,
    imageUrl: foto,
    nomeCliente: _nomeCliente,
    emailCliente: _emailCliente,
    nomeBarbeiro: _nomeBarbeiro,
    emailBarbeiro: _emailBarbeiro,
    descricao: _descricao,
    local: _local,
    preco: credentials.preco,
    cpfBarbeiro: cpfBarbeiro
  };

  const document = doc(collection(this.firestore, 'pedidos'))

  try{
    await setDoc(document, pedido);
    console.log('Pedido added succesfully');
    this.negarPedido(isOpen, id);
    const toast = await this.toastController.create({
      message: 'Pedido aceito.',
      duration: 2000,
      color: 'green',
      position: 'top'
    });
    toast.present();
  } catch(error) {
    console.log("Error adding pedido:" , error)
  }
}


async returnToMenu(){
  this.router.navigateByUrl('/tab3', { replaceUrl: true });
}

async logout() {
  await this.authService.logout();
  this.router.navigateByUrl('/', { replaceUrl: true });
}

}

