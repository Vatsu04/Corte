import { Component, Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss']
})
export class CatalogoPage {
  barbeiros: any[] = [
    { nome: '', data_nascimento: '', email: '', especialidades: '', local_trabalho: '', cpf: '', foto: '', uid: '' }
  ];
  constructor(
    private firestore: Firestore,
    private aFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    let i = 0;
    this.listarBanco();
    console.log(this.barbeiros.length);
    for (i; i < this.barbeiros.length; i++) {
      if (this.barbeiros[i].foto == undefined || null || "") {
        this.barbeiros[i].foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
      }
    }
  }
  

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "barbers"));
    querySnapshot.forEach((doc) => {
      
      this.barbeiros = [...this.barbeiros, { nome: doc.data()['nome'], email: doc.data()['email'], especialidades: doc.data()['especialidades'], local_trabalho: doc.data()['local_trabalho'], cpf: doc.data()['cpf'], foto: doc.data()['imageUrl'] }]

      
    });
  }

  //Fazer uma função de filtragem
  
}
