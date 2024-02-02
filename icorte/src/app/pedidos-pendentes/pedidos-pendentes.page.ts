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
  testeBarbearia:any = [];
  pedidos:any = [];
  pedidosBarbearia:any = [];
  isToastOpen:boolean = false;
  isModalOpen:boolean = false;
  usuarios: any = [{email:'', nome:'', cpf: ''}];
  pedidoPago:boolean = false;
  pedidoPagoBarbearia:boolean = false;
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
   await  this.listarPedidosBarbearia();
    console.log(this.pedidos.id);
    console.log(this.pedidoPago)
  }

  async listarPedidos() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
    this.teste = []
    querySnapshot.forEach((doc) => {
        


      this.teste.push({ 
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
      data: doc.data()['data'],
      hora: doc.data()['hora'],
      imageUrl: doc.data()['imageUrl'] 
    });
  });
    console.log(this.teste.length)
    
    this.pedidos = [];
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfCliente);
      console.log(this.usuarios[0].cpf)
    if(this.teste[i].cpfCliente === this.usuarios[0].cpf){
      if(this.teste[i].nomeBarbeiro != null){
      this.pedidos.push(this.teste[i]);
      }
      console.log(this.pedidos)
    }
  }
  }

  async listarPedidosBarbearia() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
    this.testeBarbearia = [];
    querySnapshot.forEach((doc) => {
      
      this.testeBarbearia.push({ 
      id: doc.id,
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      cpfCliente: doc.data()['cpfCliente'],
      nomeBarbearia: doc.data()['nomeBarbearia'], 
      emailBarbearia: doc.data()['emailBarbearia'],
      cep: doc.data()['cep'],
      descricao: doc.data()['descricao'],
      local: doc.data()['local'], 
      preco: doc.data()['preco'],
      data: doc.data()['data'],
      hora: doc.data()['hora'],
      imageUrl: doc.data()['imageUrl'] 
    });
  });
   
    this.pedidosBarbearia = [];
    for (let i = 0; i < this.testeBarbearia.length; i++) {
    if(this.testeBarbearia[i].cpfCliente === this.usuarios[0].cpf){
      if(this.testeBarbearia[i].nomeBarbearia != null){
      this.pedidosBarbearia.push(this.testeBarbearia[i]);
    }
    console.log(this.pedidosBarbearia)
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
        this.router.navigateByUrl('/', {replaceUrl:true});
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


  async pagarPedido(){
    
    const toast = await this.toastController.create({
      message: 'Pedido Pago',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
    
    this.pedidoPago = true;

    console.log(this.pedidoPago)
  }



  async pagarPedidoBarbearia(){
    
    const toast = await this.toastController.create({
      message: 'Pedido Pago',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
    
    this.pedidoPagoBarbearia = true;

    console.log(this.pedidoPagoBarbearia)
  }

  async confirmarPedido(foto: string, _nomeCliente: string, _emailCliente: string, cpfCliente: string, 
    _nomeBarbeiro: string, _emailBarbeiro: string, hora:string, data:string,
    _descricao: string, _local:string, _preco: string, _cpfBarbeiro:any, isOpen:boolean, id:string){
   
   console.log(this.pedidoPago)
    if(!this.pedidoPago){
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
        color: 'danger',
        position: 'top'
      });
      toast.present();
      this.pedidoConfirmado = isOpen;
      this.aceitarPedido(foto, _nomeCliente, _emailCliente, cpfCliente,
        _nomeBarbeiro, _emailBarbeiro, hora, data,
        _descricao, _local, _preco, _cpfBarbeiro, isOpen, id );

      
      this.cancelarPedido(isOpen, id)
      
    }
    
  } 





  async aceitarPedido(foto: string, _nomeCliente: string, _emailCliente: string, cpfCliente:string, 
    _nomeBarbeiro: string, _emailBarbeiro: string,hora:string, data:string,
    _descricao: string, _local:string, preco:string, cpfBarbeiro: string, isOpen:boolean, id:string){
   
   
   const pedidos_feitos = {
     id: id,
     hora: hora,
     data: data,
     imageUrl: foto,
     nomeCliente: _nomeCliente,
     emailCliente: _emailCliente,
     cpfCliente: cpfCliente,
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


 /*
pedidoBarbearia.imageUrl, pedidoBarbearia.nomeCliente,
             pedidoBarbearia.emailCliente, pedidoBarbearia.cpfCliente,
            pedidoBarbearia.nomeBarbearia, pedidoBarbearia.emailBarbearia, pedidoBarbearia.hora, pedidoBarbearia.data, pedidoBarbearia.descricao, pedidoBarbearia.local,
             pedidoBarbearia.preco, pedidoBarbearia.cep,
            true, pedidoBarbearia.id
 */





 async confirmarPedidoBarbearia(foto: string, _nomeCliente: string, _emailCliente: string, cpfCliente:string, 
  nomeBarbearia:string, emailBarbearia:string,
  hora:string, data:string,
  _descricao: string, _local:string, preco:string, cep: string, isOpen:boolean, id:string){
  
    if(!this.pedidoPagoBarbearia){
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
        color: 'danger',
        position: 'top'
      });
      toast.present();
      this.pedidoConfirmado = isOpen;
      this.aceitarPedidoBarbearia(foto, _nomeCliente, _emailCliente, cpfCliente,
        nomeBarbearia, emailBarbearia, hora, data,
        _descricao, _local, preco, cep, isOpen, id );

        /*
pedidoBarbearia.imageUrl, pedidoBarbearia.nomeCliente,
             pedidoBarbearia.emailCliente, pedidoBarbearia.cpfCliente,
            pedidoBarbearia.nomeBarbearia, pedidoBarbearia.emailBarbearia, pedidoBarbearia.hora, pedidoBarbearia.data, pedidoBarbearia.descricao, pedidoBarbearia.local,
             pedidoBarbearia.preco, pedidoBarbearia.cep,
            true, pedidoBarbearia.id
        */
      
      this.cancelarPedido(isOpen, id)
 
    }
  }



 async aceitarPedidoBarbearia(foto: string, _nomeCliente: string, _emailCliente: string, cpfCliente:string, 
  nomeBarbearia:string, emailBarbearia:string,
  hora:string, data:string,
  _descricao: string, _local:string, preco:string, cep: string, isOpen:boolean, id:string){
 
 
 const pedidos_feitos = {
   id: id,
   hora: hora,
   data: data,
   imageUrl: foto,
   nomeCliente: _nomeCliente,
   emailCliente: _emailCliente,
   cpfCliente: cpfCliente,
   cep: cep,
   nomeBarbearia: nomeBarbearia,
   emailBarbearia: emailBarbearia,
   descricao: _descricao,
   local: _local,
   preco: preco,
   
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

       this.router.navigateByUrl('/pedidos-pendentes', { skipLocationChange: true }).then(() => {
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
