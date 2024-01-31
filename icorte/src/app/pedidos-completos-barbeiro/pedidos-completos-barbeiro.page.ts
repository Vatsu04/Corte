import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}


@Component({
  selector: 'app-pedidos-completos-barbeiro',
  templateUrl: './pedidos-completos-barbeiro.page.html',
  styleUrls: ['./pedidos-completos-barbeiro.page.scss'],
})
export class PedidosCompletosBarbeiroPage implements OnInit {
  pedidos:any = [];
  teste:any = [];
  barbeiros:any = [];
  selectedRating: number = 0;
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  onRatingChange(rating: number) {
    console.log('Selected rating:', rating);
    // Do something with the selected rating
  }
 
  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
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

  isAboveRating(index: number): boolean {
    return index > this.rating;
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
        nomeBarbeiro: doc.data()['nomeBarbeiro'],
        emailBarbeiro: doc.data()['emailBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro']
      });
    });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfBarbeiro)
      console.log(this.barbeiros[0].cpf)
      


if (this.teste[i].cpfBarbeiro === this.barbeiros[0].cpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
        console.log(this.teste[i].nomeBarbeiro)
        console.log( this.barbeiros[0]?.nome)
        this.pedidos.push(this.teste[i]); // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
    console.log(this.pedidos); // Log the result for verification
  }
  

  async returnToMenu(){
    this.router.navigateByUrl('/tab3', { replaceUrl: true });
  }

  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
   
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbeiros = [{ nome: userDoc.data()['nome'],
         email: userDoc.data()['emaiL'], 
        
         cpf: userDoc.data()['cpf']  }];
       
      } else {
        const userDoc2 = await getDoc(doc(this.firestore, "barberShops", userUID));
        if (userDoc2.exists()) {
          console.log(`${userDoc.id} => ${userDoc2.data()['nome']}`);
          this.barbeiros = [{ nome: userDoc2.data()['nome'],
           email: userDoc2.data()['email'], 
      
           cep: userDoc2.data()['cep']  }];
      }
    } 
   
    
  }else {
    console.error('User UID not available');
  }
  return Promise.resolve(); // Resolve the promise when the function completes

}



}
