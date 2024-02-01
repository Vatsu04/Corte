import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-pedidos-completos-cliente',
  templateUrl: './pedidos-completos-cliente.page.html',
  styleUrls: ['./pedidos-completos-cliente.page.scss'],
})
export class PedidosCompletosClientePage implements OnInit {
  teste:any = [];
  testeBarbearia:any = [];
  pedidosBarbearia: any = [];
  pedidos:any = [];
  usuarios:any = [];
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  credentials: FormGroup = this.fb.group({
    avaliacaoBarbeiro: ['', [Validators.required, ]],

  });
  constructor(
  
    private firestore: Firestore,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    this.rating =0;
   }

  async ngOnInit() {
    await this.listarBanco();
    await this.listarPedidos();
    this.listarPedidosBarbearia();
  }

  async rate(index: number, id:string) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    try {
      await updateDoc(doc(this.firestore, 'pedidos_feitos', id), { avaliacaoBarbeiro: this.rating });
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
    this.teste = [];
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
      imageUrl: doc.data()['imageUrl'] 
    });
  });
    this.pedidos = []
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfCliente);
      console.log(this.usuarios[0].cpf);
    if(this.teste[i].cpfCliente === this.usuarios[0].cpf){
      if(this.teste[i].nomeBarbeiro != null){
      this.pedidos.push(this.teste[i]);
    }
  }
  }
  }

  async listarPedidosBarbearia() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.testeBarbearia = [];
    querySnapshot.forEach((doc) => {
      
      this.testeBarbearia.push({ 
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
      imageUrl: doc.data()['imageUrl'] 
    });
  });
    this.pedidosBarbearia = []
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfCliente);
      console.log(this.usuarios[0].cpf);
    if(this.teste[i].cpfCliente === this.usuarios[0].cpf){
      if(this.teste[i].nomeBarbearia != null){
      this.pedidosBarbearia.push(this.teste[i]);
    }
  }
  }
  }


  // FAZER AS FUNÇÕES PARA BARBEARIA


  get avaliacao(){
    return this.credentials.get('avaliacao');
  }


  async avaliar(){
    console.log(this.credentials.value.rapidez)
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
  async returnToMenu(){
    this.router.navigateByUrl('/tab1', { replaceUrl: true });
  }
}
