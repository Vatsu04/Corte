import { Component } from '@angular/core';
import { Firestore, collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  barbeiros: any[] = [
    { nome: '', data_nascimento: '', email: '', especialidades: '', local_trabalho: '', cpf: '', foto: '', uid: '' }
  ];
  constructor(
    private firestore: Firestore
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
    const querySnapshot = await getDocs(collection(this.firestore, "Barbeiros"));
    querySnapshot.forEach((doc) => {
      
      this.barbeiros = [...this.barbeiros, { nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] }]

      
    });
  }

  //Fazer uma função de filtragem
  
}
