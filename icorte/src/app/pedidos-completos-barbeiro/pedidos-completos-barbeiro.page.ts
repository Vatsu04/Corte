import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  onRatingChange(rating: number) {
    console.log('Selected rating:', rating);
    // Do something with the selected rating
  }
  credentials: FormGroup = this.fb.group({
    nota: ['', [Validators.required, ]],
  });
  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
        descricao: doc.data()['descricao'],
        nomeBarbeiro: doc.data()['nomeBarbeiro'],
        emailBarbeiro: doc.data()['emailBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro']
      });
    });
  
    this.pedidos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.barbeiros[0].nome)
      const testeCpfBarbeiro = this.teste[i].cpfBarbeiro.toLowerCase();
      const barbeiroCpf = this.barbeiros[0].cpf.toLowerCase();
      


if (testeCpfBarbeiro === barbeiroCpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
        console.log(this.teste[i].nomeBarbeiro)
        console.log( this.barbeiros[0]?.nome)
        this.pedidos[i] = this.teste[i]; // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
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
         especialidades: userDoc.data()['especialidades'],
         cpf: userDoc.data()['cpf']  }];
       
      } else {
        console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
        this.router.navigateByUrl('/login-barbeiro', { replaceUrl: true }); // Provavelmente vou mudar as duas páginas de login para uma página de login universal, mas ainda vou testar
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
    
  }

}
