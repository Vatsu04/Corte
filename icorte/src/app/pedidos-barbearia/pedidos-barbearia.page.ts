import { Component, OnInit } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-barbearia',
  templateUrl: './pedidos-barbearia.page.html',
  styleUrls: ['./pedidos-barbearia.page.scss'],
})
export class PedidosBarbeariaPage implements OnInit {
  barbearias:any = [];
  pedidos: any = [];
  teste:any = [];
  credentials: FormGroup = this.fb.group({
    preco: ['', [Validators.required, Validators.minLength(2), this.isValidFloat]],
  });
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializePage();
    
  }

  async initializePage(){
    await this.listarBanco();
    await this.listarChamados();
  }

  get preco() {
    return this.credentials.get('preco');
  }


  isValidFloat(control: AbstractControl): { [key: string]: any } | null {
    const floatValue = parseFloat(control.value);
  
    if (isNaN(floatValue)) {
      return { 'invalidFloat': true };
    }
  
    return null;
  }


  async listarChamados() {
    const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
    this.teste = []; // Clear the array before populating it

  
    querySnapshot.forEach((doc) => {
      
      this.teste = [...this.teste, { 
      id: doc.id,
      corteAtual: doc.data()['corteAtual'],
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      cpfCliente: doc.data()['cpfCliente'],
      cep: doc.data()['cep'],
      descricao: doc.data()['descricao'],
      hora: doc.data()['hora'],
      data: doc.data()['data'],
      local: doc.data()['local'], 
      nomeBarbearia: doc.data()['nomeBarbearia'],
      emailBarbearia: doc.data()['emailBarbearia'],
      imageUrl: doc.data()['imageUrl'] }]
    });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {

      if(this.teste[i].cep === this.barbearias[0].cep){
        console.log(this.barbearias[0].cep)
        console.log(this.teste[i].imageUrl)
        
        this.pedidos.push(this.teste[i]);
        console.log(this.teste[i].imageUrl)
      }
    }
    }
  

  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
   
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barberShops", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbearias = [{ nome: userDoc.data()['nome'],
         email: userDoc.data()['email'], 
         
         cep: userDoc.data()['cep']  }];
       
      } else {
        console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
        this.router.navigateByUrl('/', { replaceUrl: true }); // Provavelmente vou mudar as duas páginas de login para uma página de login universal, mas ainda vou testar
      // const userDoc2 = await getDoc(doc(this.firestore, "barberShops", userUID));
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
    
  }

  async negarPedido(isOpen:boolean, id:string){
    await deleteDoc(doc(this.firestore, "chamados", id));
    
    
    // Wait for a short time to allow Firebase to process the deletion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.pedidos = [];
    await this.listarBanco();
  
    // Reload the current route to refresh the page
    this.router.navigateByUrl('/pedidos-barbearia', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pedidos-barbearia']);
    });
  }
  
  async negar(isOpen:boolean, id:string){
    this.negarPedido(isOpen, id);
    const toast = await this.toastController.create({
      message: 'Pedido negado.',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  async returnToMenu(){
    this.router.navigateByUrl('/menu-barbearia', { replaceUrl: true });
  }
  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

/*
  async aceitarPedido(foto: string, foto2: string, _nomeCliente: string, _emailCliente: string,
    _nomeBarbearia: string, _emailBarbearia: string, hora: string, data: string,
    _descricao: string, _local:string, credentials: any, cep: string, isOpen:boolean, id:string, cpf: string){
*/

  async aceitarPedido(foto: string, foto2: string, _nomeCliente: string, _emailCliente: string,
    _nomeBarbearia: string, _emailBarbearia: string, hora: string, data: string,
    _descricao: string, _local:string, credentials: any, cep: string, isOpen:boolean, id:string, cpf: string){
      if(_local === "Local de Trabalho"){
        _local = this.barbearias[0].endereco
      }
   
   const pedido = {

     hora: hora,
     data: data,
     corteAtual: foto2,
     imageUrl: foto,
     cep: cep,
     descricao: _descricao,
     nomeBarbearia: _nomeBarbearia,
     emailBarbearia: _emailBarbearia,
     nomeCliente: _nomeCliente,
     emailCliente: _emailCliente,
     cpfCliente: cpf,
     local: _local,
     preco: credentials.preco

   };
 
   const document = doc(collection(this.firestore, 'pedidos'))
 
   try{
     await setDoc(document, pedido);
     console.log('Pedido added succesfully');
     this.negarPedido(isOpen, id);
     const toast = await this.toastController.create({
       message: 'Pedido aceito.',
       duration: 2000,
       color: 'danger',
       position: 'top'
     });
     toast.present();
   } catch(error) {
     console.log("Error adding pedido:" , error)
   }
 }
 
  
}
