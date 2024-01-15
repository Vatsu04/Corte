import { Component, OnInit, Injectable } from '@angular/core';

import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
  /*
  imageUrl: this.imgSrc,
  nomeCliente: this.usuarios[0].nome,
  emailCliente: this.usuarios[0].email,
  nomeBarbeiro: this.barber.nome,
  emailBarbeiro: this.barber.email,
  descricao: this.descricao?.value,
  local: this.local?.value

*/

export class PedidosPage implements OnInit {
  pedidos: any = [{nomeCliente:'', emailCliente:'', nomeBarbeiro:'', emailBarbeiro:'', descricao:'', local:'', imageUrL:''}];
  usuarios: any = [{email:'', nome:''}];
  barbeiros:any = [{nome:'', data_nascimento:'', email:'', especialidades:'', local_trabalho:'', cpf:'', foto:'', uid:''}]
  teste:any = [];
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


async listarChamados() {
  let i =0;
  let j = 0;
  const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
  querySnapshot.forEach((doc) => {
    
    this.teste = [...this.teste, { 
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
}
