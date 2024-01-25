import { Component } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: 'catalogo.page.html',
  styleUrls: ['catalogo.page.scss']
})
export class CatalogoPage {
  profile: null | DocumentData | undefined = null;
  originalBarbeiros: any[] = [];
  barbeiros: any[] = [];
  usuarios: any = [{email:'', nome:'', foto:'', endereco:''}];
  barber: any = { nome: '', email: '', cpf:'' };
  teste:any = [];
  pedidos_feitos: any = [];
  filterForm: FormGroup;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.filterForm = new FormGroup({
      tipoCabelo: new FormControl(''),
      tamanhoCabelo: new FormControl(''),
    });
  }

  ngOnInit() {
    this.barber = history.state.barber || { nome: '', email: '', cpf: '' };

    this.listarBanco();
  }

  async returnToMenu() {
    console.log('Returning to menu...');
    this.router.navigate(['/tab1']);
  }

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, 'barbers'));
    this.originalBarbeiros = querySnapshot.docs.map((doc) => ({
      nome: doc.data()['nome'],
      email: doc.data()['emaiL'],
      especialidade_tamanho_cabelo: doc.data()['especialidade_tamanho_cabelo'],
      especialidade_tipo_cabelo: doc.data()['especialidade_tipo_cabelo'],
      local_trabalho: doc.data()['local_trabalho'],
      cpf: doc.data()['cpf'],
      foto: doc.data()['imageUrl'],
    }));
    this.barbeiros = [...this.originalBarbeiros];
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  chamarBarbeiro(email: string, nome: string, cpf:string) {
    this.router.navigateByUrl('/chamado', {
      replaceUrl: true,
      state: { barber: { nome, email, cpf } }
    });
  }

  filterBarbers() {
    const tipoCabelo = this.filterForm.get('tipoCabelo')?.value;
    const tamanhoCabelo = this.filterForm.get('tamanhoCabelo')?.value;
  
    this.barbeiros = this.originalBarbeiros.filter((barbeiro) => {
      if (tipoCabelo && tipoCabelo !== '' && barbeiro.especialidade_tipo_cabelo !== tipoCabelo) { 
        return false;
      }
      if (tamanhoCabelo && tamanhoCabelo !== '' && barbeiro.especialidade_tamanho_cabelo !== tamanhoCabelo) {
        return false;
      }
      return true;
    });
  }


  async listarPedidosFeitos(){
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        avaliacao: doc.data()['avaliacao'],
        cpfBarbeiro: doc.data()['cpfBarbeiro'],
     
      });
    });
  


   
  }


    calculateAverageAvaliacao(cpfBarbeiro: string) {
    let sum = 0;
    let count = 0;
   console.log(this.pedidos_feitos.length);
    if(this.pedidos_feitos.length === 0){
      return "Sem avaliação";
    } else{
    for (const pedido of this.pedidos_feitos) {
      

      if (pedido.avaliacao && this.pedidos_feitos[pedido].cpfBarbeiro === cpfBarbeiro) {
        sum += pedido.avaliacao;
        count++;

        let average:any = count > 0 ? sum / count : 0;
  
        return "3123";


      } 
    }
  
    return "Sem avaliação"
  }
  }
}