import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-completos-cliente',
  templateUrl: './pedidos-completos-cliente.page.html',
  styleUrls: ['./pedidos-completos-cliente.page.scss'],
})
export class PedidosCompletosClientePage implements OnInit {
  teste:any = [];
  pedidos:any = [];
  usuarios:any = [];
  credentials: FormGroup = this.fb.group({
    rapidez: ['', [Validators.required, ]],
    organizacao: ['', [Validators.required, ]],
    educacao: ['', [Validators.required, ]]
  });
  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) { }

  async ngOnInit() {
    await this.listarBanco();
    this.listarPedidos();
  }
  async listarPedidos() {
    
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
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
  get rapidez(){
    return this.credentials.get('rapidez');
  }

  get organizao(){
    return this.credentials.get('organizao');
  }

  get educacao(){
    return this.credentials.get('educacao');
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
        this.router.navigateByUrl('/tab3', {replaceUrl:true});
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
