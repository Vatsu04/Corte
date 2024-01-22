import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.page.html',
  styleUrls: ['./pedidos-pendentes.page.scss'],
})
export class PedidosPendentesPage implements OnInit {
  teste:any = [];
  pedidos:any = [];
  isToastOpen:boolean = false;
  isModalOpen:boolean = false;
  usuarios: any = [{email:'', nome:''}];
  pedidoPago:boolean = false;
  pedidoConfirmado:boolean = false;
  pedidoCompleto:boolean = true;
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  
  async initializePage() {
    await this.listarBanco();
    this.listarPedidos();
    console.log(this.pedidos);
    console.log(this.pedidos.id);
  }

  async listarPedidos() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
    querySnapshot.forEach((doc) => {
      
      this.teste = [...this.teste, { 
      id: doc.id,
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      nomeBarbeiro: doc.data()['nomeBarbeiro'], 
      emailBarbeiro: doc.data()['emailBarbeiro'],
      descricao: doc.data()['descricao'],
      local: doc.data()['local'], 
      preco: doc.data()['preco'],
      imageUrl: doc.data()['imageUrl'] }]
    });
    
    for (let i = 0; i < this.teste.length; i++) {
    if(this.teste.nomeCliente == this.usuarios.nome && this.teste.emailCliente == this.usuarios.email){
      this.pedidos[i] = this.teste[i];
    }
  }
  }


  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
  
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "users", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'] }];
        console.log(this.usuarios[0]?.nome);
      console.log(this.usuarios[0]?.email);
      } else {
        this.router.navigateByUrl('/tab3', {replaceUrl:true});
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
  }

  pago(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  confirma(isOpen: boolean){
    this.isToastOpen = isOpen;
  }
  mensagem(isOpen: boolean){
    this.isToastOpen = isOpen;
  }


  async pagarPedido(isOpen: boolean){
    this.pago(isOpen);
    this.pedidoPago = isOpen;
  }

  async confirmarPedido(isOpen: boolean){
    this.pago(isOpen);
    if(this.pedidoPago != true){
      this.mensagem(isOpen);
    } else{
      this.confirma(isOpen);
      this.pedidoConfirmado = isOpen;
    }
    
  } 

  async cancelarPedido(isOpen:boolean, id:string){
    await deleteDoc(doc(this.firestore, "pedidos", id));
    this.pago(isOpen);
    setTimeout(() => {
      this.pedidos=[]
      this.listarBanco()
     }, 2000);

       this.router.navigateByUrl('/tab1', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/pedidos-pendentes']);
  });
  }
  
async returnToMenu(){
  this.router.navigateByUrl('/tab1', {replaceUrl:true});
}

async logout() {
  await this.authService.logout();
  this.router.navigateByUrl('/', { replaceUrl: true });
}
  


}
