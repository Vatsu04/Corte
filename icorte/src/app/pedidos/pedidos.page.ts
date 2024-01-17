import { Component, OnInit, Injectable } from '@angular/core';

import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})


export class PedidosPage implements OnInit {
  pedido:any =[{nomeCliente:'', emailCliente:'', nomeBarbeiro:'', emailBarbeiro:'', descricao:'', local:'', imageUrL:''}];
  pedidos: any = [{nomeCliente:'', emailCliente:'', nomeBarbeiro:'', emailBarbeiro:'', descricao:'', local:'', imageUrL:''}];
  usuarios: any = [{email:'', nome:''}];
  barbeiros:any = [{nome:'', data_nascimento:'', email:'', especialidades:'', local_trabalho:'', cpf:'', foto:'', uid:''}]
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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  
  }

  mensagem(isOpen: boolean) {
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
  let i =0;
  
  const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
  querySnapshot.forEach((doc) => {
    
    this.teste = [...this.teste, { 
    id: doc.id,
    nomeCliente: doc.data()['nomeCliente'],
    emailCliente: doc.data()['emailCliente'],
    imageUrl: doc.data()['imageUrl'], 
    local: doc.data()['imageUrl'],
    descricao: doc.data()['descricao'],
    nomeBarbeiro: doc.data()['nomeBarbeiro'],
    emailBarbeiro: doc.data()['emailBarbeiro'],
    
     }]

    
  });
  for (i; i < this.teste.length; i++) {
    
      if (this.teste[i].barberNome == this.barbeiros.nome && this.teste[i].barberEmail == this.barbeiros.email) {
        this.pedidos.nomeCliente =this.teste.nomeCliente;
        this.pedidos.emailCliente = this.teste.NomeCliente;
        this.pedidos.imageUrl =this.teste.imageUrl;
        this.pedidos.local = this.teste.local;
        this.pedidos.nomeBarbeiro = this.teste.nomeBarbeiro;
        this.pedidos.emailBarbeiro = this.teste.emailBarbeiro;

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
       email: userDoc.data()['emaiL'], //Email com 2 Ls
       especialidades: userDoc.data()['especialidades']  }];
      console.log(this.barbeiros[0]?.nome);
  console.log(this.barbeiros[0]?.email);
    } else {
      console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
      this.router.navigateByUrl('/login-barbeiro', { replaceUrl: true }); // Provavelmente vou mudar as duas páginas de login para uma página de login universal, mas ainda vou testar
    }
  } else {
    console.error('User UID not available');
  }
}


async negarPedido(isOpen:boolean, id:string){
  await deleteDoc(doc(this.firestore, "chamados", id));
  this.mensagem(isOpen);
  setTimeout(() => {
    this.pedidos=[]
    this.listarBanco()
   }, 2000);
}

async aceitarPedido(foto: string, _nomeCliente: string, _emailCliente: string, _nomeBarbeiro: string, _emailBarbeiro: string, _descricao: string, _local:string, credentials: any){
  
  
  const pedido ={
    imageUrl: foto,
    nomeCliente: _nomeCliente,
    emailCliente: _emailCliente,
    nomeBarbeiro: _nomeBarbeiro,
    emailBarbeiro: _emailBarbeiro,
    descricao: _descricao,
    local: _local,
    preco: credentials.preco
  };

  const document = doc(collection(this.firestore, 'pedidos'))

  try{
    await setDoc(document, pedido);
    console.log('Pedido added succesfully');
  } catch(error) {
    console.log("Error adding chamado:" , error)
  }
}



}

