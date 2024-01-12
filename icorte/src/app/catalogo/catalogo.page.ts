import { Component } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss']
})
export class CatalogoPage {
  profile: null | DocumentData | undefined = null;
  barbeiros: any[] = [];
  usuarios: any = [{email:'', nome:'', foto:'', endereco:''}];
  public static barber:any = [];
  
  constructor(
    private firestore: Firestore,
  
    private router:Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.listarBanco();
 
    
  }
  
  async returnToMenu(){
    console.log('Returning to menu...');
    this.router.navigate(['/tab1']);
  }


  
  



  async listarBanco() {
    let i =0;
    const querySnapshot = await getDocs(collection(this.firestore, "barbers"));
    querySnapshot.forEach((doc) => {
      
      this.barbeiros = [...this.barbeiros, { nome: doc.data()['nome'], 
      email: doc.data()['emaiL'],
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

  async chamarBarbeiro(email:string, nome:string){
    CatalogoPage.barber.nome = nome;
    CatalogoPage.barber.email = email;

    this.router.navigateByUrl('/chamado', {replaceUrl: true});

  }


}
