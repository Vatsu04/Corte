import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedido-pendente-barbeiro',
  templateUrl: './pedido-pendente-barbeiro.page.html',
  styleUrls: ['./pedido-pendente-barbeiro.page.scss'],
})
export class PedidoPendenteBarbeiroPage implements OnInit {
  barbeiros:any = [];
  teste:any = [];
  pedidos:any = [];
  isToastOpen:boolean = false;
  isModalOpen:boolean = false;
  usuarios: any = [{email:'', nome:''}];
  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore
    
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  
  async initializePage() {
    await this.listarBanco();
    this.listarPedidos();
    console.log(this.pedidos);
  }


  async listarPedidos() {
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos"));
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
      });
    });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.barbeiros[0].nome)
      const testeNomeBarbeiro = this.teste[i].nomeBarbeiro.toLowerCase();
const barbeiroNome = this.barbeiros[0].nome.toLowerCase();
const testeEmailBarbeiro = this.teste[i].emailBarbeiro.toLowerCase();
const barbeiroEmail = this.barbeiros[0].email.toLowerCase();

console.log('Teste Nome Barbeiro:', testeNomeBarbeiro);
console.log('Barbeiro Nome:', barbeiroNome);
console.log('Teste Email Barbeiro:', testeEmailBarbeiro);
console.log('Barbeiro Email:', barbeiroEmail);
if (testeNomeBarbeiro === barbeiroNome && testeEmailBarbeiro === barbeiroEmail) {
        console.log(this.teste[i].nomeBarbeiro)
        console.log( this.barbeiros[0]?.nome)
        this.pedidos[i] = this.teste[i]; // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
    console.log(this.pedidos); // Log the result for verification
  }
  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));

      if (userDoc.exists()) { // Pegar os dados da base de dados
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbeiros = [{ nome: userDoc.data()['nome'],
         email: userDoc.data()['emaiL'], //Email com 2 Ls
         especialidades: userDoc.data()['especialidades']  }];
        console.log(this.barbeiros[0]?.nome);
        console.log(this.barbeiros[0]?.email);
      } else {
        console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
        this.router.navigateByUrl('/login-barbeiro', { replaceUrl: true }); 
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
  }

  async returnToMenu(){
    this.router.navigateByUrl('/tab3', { replaceUrl: true });
  }
  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  async cancelarPedido(isOpen:boolean, id:string){
    await deleteDoc(doc(this.firestore, "pedidos", id));
    this.mensagem(isOpen);
    
    // Wait for a short time to allow Firebase to process the deletion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.pedidos = [];
    await this.listarBanco();
  
    // Reload the current route to refresh the page
    this.router.navigateByUrl('/tab3', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pedidos']);
    });
  }
  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
