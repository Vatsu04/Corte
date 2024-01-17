import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.page.html',
  styleUrls: ['./pedidos-pendentes.page.scss'],
})
export class PedidosPendentesPage implements OnInit {
  pedidos:any = [];
  isToastOpen:boolean = false;
  isModalOpen:boolean = false;
  constructor(
    private firestore: Firestore
  ) { }

  ngOnInit() {
  }

  async listarBanco() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
    querySnapshot.forEach((doc) => {
      
      this.pedidos = [...this.pedidos, { 
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      nomeBarbeiro: doc.data()['nomeBaberio'], 
      emailBarbeiro: doc.data()['emailBarbeiro'],
      descricao: doc.data()['descricao'],
      local: doc.data()['local'] }]

      
    });
    
    
  }


  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async cancelarPedido(isOpen:boolean, id:string){
    await deleteDoc(doc(this.firestore, "chamados", id));
    this.mensagem(isOpen);
    setTimeout(() => {
      this.pedidos=[]
      this.listarBanco()
     }, 2000);
  }
  

  


}
