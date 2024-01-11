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
export class PedidosPage implements OnInit {
  pedidos: any[] = []
  usuarios: any = [{email:'', nome:''}];
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
//Funções a fazer
// Cadastrar os pedidos no banco de dados
// Nos pedidos serão cadastrados o nome, email, endereço e foto do usuário que chamou o barbeiro e o tipo de atendimento


/*
      nome: this.usuarios.nome,
      email: this.usuarios.email,
      foto: this.usuarios.foto,
      endereco: this.usuarios.endereco,
      barberNome: this.barber.nome,
      barberEndereco: this.barber.endereco
*/

async listarBanco() {
  const userUID = await this.authService.getCurrentUserUID();

  if (userUID) {
    const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));

    if (userDoc.exists()) {
      console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
      this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'] }];
      console.log(this.usuarios[0]?.nome);
  console.log(this.usuarios[0]?.email);
    } else {
      console.error('User document not found');
    }
  } else {
    console.error('User UID not available');
  }
}

async listarPedidos() {
  let i =0;
  const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
  querySnapshot.forEach((doc) => {
    
    this.pedidos = [...this.pedidos, { nome: doc.data()['nome'], 
    email: doc.data()['email'],
    foto: doc.data()['foto'], 
    local_trabalho: doc.data()['local_trabalho'],
    endereco: doc.data()['endereco'],
    barberNome: doc.data()['barberNome'],
    barberEndereco: doc.data()['barberEndereco']
     }]

    
  });
  for (i; i < this.pedidos.length; i++) {
    if (this.pedidos[i].foto == undefined || null || "") {
      this.pedidos[i].foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
    }
  }
}
}
