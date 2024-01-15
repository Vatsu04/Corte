import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.page.html',
  styleUrls: ['./pedidos-pendentes.page.scss'],
})
export class PedidosPendentesPage implements OnInit {
  pedidos:any = [];
  constructor(
    private firestore: Firestore
  ) { }

  ngOnInit() {
  }

  async listarBanco() {
    let i =0;
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
    querySnapshot.forEach((doc) => {
      
      this.pedidos = [...this.pedidos, { nome: doc.data()['nome'], 
      email: doc.data()['emaiL'],
      especialidades: doc.data()['especialidades'], 
      local_trabalho: doc.data()['local_trabalho'],
      cpf: doc.data()['cpf'],
      foto: doc.data()['imageUrl'] }]

      
    });
    
    
  }

  

}
