import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  usuarios: any = [{email:'', nome:'', cpf: ''}];
  pedidoPago:boolean = false;
  pedidoConfirmado:boolean = false;
  pedidoCompleto:boolean = true;
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  
  async initializePage() {
    await this.listarBanco();
    await this.listarPedidos();
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
      cpfCliente: doc.data()['cpfCliente'],
      nomeBarbeiro: doc.data()['nomeBarbeiro'], 
      emailBarbeiro: doc.data()['emailBarbeiro'],
      cpfBarbeiro: doc.data()['cpfBarbeiro'],
      descricao: doc.data()['descricao'],
      local: doc.data()['local'], 
      preco: doc.data()['preco'],
      imageUrl: doc.data()['imageUrl'] }]
    });
    
    for (let i = 0; i < this.teste.length; i++) {
    if(this.teste[i].cpfCliente === this.usuarios.cpf){
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
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'], cpf: userDoc.data()['cpf'] }];
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
  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  async pagarPedido(isOpen: boolean){
    
    const toast = await this.toastController.create({
      message: 'Pedido Pago',
      duration: 2000,
      color: 'blue',
      position: 'top'
    });
    toast.present();
    
    this.pedidoPago = isOpen;
  }

  async confirmarPedido(foto: string, _nomeCliente: string, _emailCliente: string,
    _nomeBarbeiro: string, _emailBarbeiro: string,
    _descricao: string, _local:string, _preco: string, _cpfBarbeiro:any, isOpen:boolean, id:string){
   
    if(this.pedidoPago != true){
      const toast = await this.toastController.create({
        message: 'Pague o pedido antes de confirma-lo!',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    } else{
      const toast = await this.toastController.create({
        message: 'Pedido Completo!',
        duration: 2000,
        color: 'blue',
        position: 'top'
      });
      toast.present();
      this.pedidoConfirmado = isOpen;
      this.aceitarPedido(foto, _nomeCliente, _emailCliente,
        _nomeBarbeiro, _emailBarbeiro,
        _descricao, _local, _preco, _cpfBarbeiro, isOpen, id );

      
      this.cancelarPedido(isOpen, id)
    }
    
  } 





  async aceitarPedido(foto: string, _nomeCliente: string, _emailCliente: string,
    _nomeBarbeiro: string, _emailBarbeiro: string,
    _descricao: string, _local:string, preco:string, cpfBarbeiro: string, isOpen:boolean, id:string){
   
   
   const pedidos_feitos = {
     id: id,
     imageUrl: foto,
     nomeCliente: _nomeCliente,
     emailCliente: _emailCliente,
     nomeBarbeiro: _nomeBarbeiro,
     emailBarbeiro: _emailBarbeiro,
     descricao: _descricao,
     local: _local,
     preco: preco,
     cpfBarbeiro: cpfBarbeiro
   };
 
   const document = doc(collection(this.firestore, 'pedidos_feitos'))
 
   try{
     await setDoc(document, pedidos_feitos);
     console.log('Pedido added succesfully');
   
    
   } catch(error) {
     console.log("Error adding pedido:" , error)
   }
 }
 


  async cancelarPedido(isOpen:boolean, id:string){ // deletar o pedido do banco de dados
    await deleteDoc(doc(this.firestore, "pedidos", id)); // Apaga do banco de dados de acordo com o ID
    
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
