import { Component, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss']
})
export class CatalogoPage {
  barbeiros: any[] = [];
  usuarios: any = [{email:'', nome:'', foto:'', endereco:''}];
  public static barber:any = []
  
  constructor(
    private firestore: Firestore,
    private aFirestore: AngularFirestore,
    private router:Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.listarBanco();
    console.log(this.barbeiros.length);
    
  }
  
  async returnToMenu(){
    console.log('Returning to menu...');
    this.router.navigate(['/tab1']);
  }


  
  

  async informacoesUsuario() {
    const userUID = await this.authService.getCurrentUserUID();

    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "users", userUID));

      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.usuarios = [{ nome: userDoc.data()['nome'], email: userDoc.data()['email'], endereco: userDoc.data()['endereco'], foto: userDoc.data()['imageUrl'] }];
        console.log(this.usuarios[0]?.nome);
    console.log(this.usuarios[0]?.email);
      } else {
        console.error('User document not found');
      }
    } else {
      console.error('User UID not available');
    }
  }

  async listarBanco() {
    let i =0;
    const querySnapshot = await getDocs(collection(this.firestore, "barbers"));
    querySnapshot.forEach((doc) => {
      
      this.barbeiros = [...this.barbeiros, { nome: doc.data()['nome'], 
      email: doc.data()['emaiL'] /*cometi um erro no firebase n tem como mudar kkkk, escreve assim*/,
      especialidades: doc.data()['especialidades'], 
      local_trabalho: doc.data()['local_trabalho'],
      cpf: doc.data()['cpf'],
      foto: doc.data()['imageUrl'] }]

      
    });
    for (i; i < this.barbeiros.length; i++) {
      if (this.barbeiros[i].foto == undefined || null || "") {
        this.barbeiros[i].foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
      }
    }
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  //Fazer uma função de filtragem
  async chamarBarbeiro(email:string, nome:string){
    CatalogoPage.barber.nome = nome;
    CatalogoPage.barber.email = email;

    this.router.navigateByUrl('/chamado', {replaceUrl: true});

  }


  async dadosBarbeiro(){

  }
  async getLoggedInUserData(){

  }
}
