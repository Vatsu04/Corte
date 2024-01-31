import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-pedidos-completos-barbearia',
  templateUrl: './pedidos-completos-barbearia.page.html',
  styleUrls: ['./pedidos-completos-barbearia.page.scss'],
})
export class PedidosCompletosBarbeariaPage implements OnInit {
  pedidos:any = [];
  teste:any = [];
  barbearias:any = [];
  selectedRating: number = 0;
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService
  ) {
    this.rating = 0;
   }

  async ngOnInit() {

    await this.listarBanco();
    this.listarPedidos();
  }


  async rate(index: number, id: string) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    try {
      await updateDoc(doc(this.firestore, 'pedidos_feitos', id), { avaliacaoCliente: this.rating });
      console.log('Avaliacao updated successfully!');
    } catch (error) {
      console.error('Error updating avaliacao:', error);
    }
    
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }

    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
   
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barberShops", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbearias = [{ nome: userDoc.data()['nome'],
         email: userDoc.data()['emaiL'], 
         
         cep: userDoc.data()['cpf']  }];
       
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

  async listarPedidos() {
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        nomeCliente: doc.data()['nomeCliente'],
        emailCliente: doc.data()['emailCliente'],
        imageUrl: doc.data()['imageUrl'], 
        local: doc.data()['local'],
        hora: doc.data()['hora'],
        data: doc.data()['data'],
        descricao: doc.data()['descricao'],
        nomeBarbearia: doc.data()['nomeBarbearia'],
        emailBarbearia: doc.data()['emailBarbearia'],
        cep: doc.data()['cep']
      });
    });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cep)
      console.log(this.barbearias[0].cep)
      


if (this.teste[i].cep === this.barbearias[0].cep) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
       
  this.pedidos.push(this.teste[i]); // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
    console.log(this.pedidos); // Log the result for verification
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  async returnToMenu(){
    this.router.navigateByUrl('/menu-barbearia', { replaceUrl: true });
  }

}
