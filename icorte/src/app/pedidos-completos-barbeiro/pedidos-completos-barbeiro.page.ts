import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedidos-completos-barbeiro',
  templateUrl: './pedidos-completos-barbeiro.page.html',
  styleUrls: ['./pedidos-completos-barbeiro.page.scss'],
})
export class PedidosCompletosBarbeiroPage implements OnInit {
  pedido:any = [];
  teste:any = [];
  barbeiros:any = [];
  constructor(
    private firestore: Firestore
  ) { }

  ngOnInit() {
  }
  async listarChamados() {
    const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        nomeCliente: doc.data()['nomeCliente'],
        emailCliente: doc.data()['emailCliente'],
        imageUrl: doc.data()['imageUrl'], 
        local: doc.data()['local'],
        descricao: doc.data()['descricao'],
        nomeBarbeiro: doc.data()['nomeBarbeiro'],
        emailBarbeiro: doc.data()['emailBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro']
      });
    });
  
    this.pedido = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.barbeiros[0].nome)
      const testeCpfBarbeiro = this.teste[i].cpfBarbeiro.toLowerCase();
      const barbeiroCpf = this.barbeiros[0].cpf.toLowerCase();
      


if (testeCpfBarbeiro === barbeiroCpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
        console.log(this.teste[i].nomeBarbeiro)
        console.log( this.barbeiros[0]?.nome)
        this.pedido[i] = this.teste[i]; // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
    console.log(this.pedido); // Log the result for verification
  }
  

}
