import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData, Firestore, collection, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directive, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  profile: null | DocumentData | undefined = null;
  barbeiros:any[] = [{nome:'', data_nascimento:'', especialidade_tamanho_cabelo:'', especialidade_tipo_cabelo:'', email:'',  local_trabalho:'', cpf:'', foto:'', uid:''}];
  teste:any = [];
  pedidos:any = [];
  pedidos_feitos: any = [];
  isToastOpen:boolean = false;
  isModalOpen:boolean = false;
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private firestore: Firestore,
    private el: ElementRef
  ) {
    this.avatarService.getBarberProfile().subscribe((data) => {
      this.profile = data;
    });
  }
  
  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
  
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barbers", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbeiros = [{ 
          nome: userDoc.data()['nome'], 
          email: userDoc.data()['emaiL'],
          especialidade_tamanho_cabelo: userDoc.data()['especialidade_tamanho_cabelo'],
          especialidade_tipo_cabelo: userDoc.data()['especialidade_tipo_cabelo'],
          local_trabalho: userDoc.data()['local_trabalho'],
          cpf: userDoc.data()['cpf'],
          foto: userDoc.data()['imageUrl']
        }];
      } else {
        console.error('Campos do usuário não encontrados, o usuário logado é provavelmente um cliente');
        this.router.navigateByUrl('/tab1', { replaceUrl: true });
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
  }
  

  async ngOnInit() {
    await this.listarBanco();
    console.log(this.barbeiros[0].nome)
    
    await this.listarPedidos();
    await this.listarPedidosFeitos();
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
        corteAtual: doc.data()['corteAtual'],
        descricao: doc.data()['descricao'],
        nomeBarbeiro: doc.data()['nomeBarbeiro'],
        emailBarbeiro: doc.data()['emailBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro'],
        preco: doc.data()['preco'],
        hora: doc.data()['hora'],
        data: doc.data()['data']
      });
    });
  
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.barbeiros[0].nome)


if (this.teste[i].cpfBarbeiro ===  this.barbeiros[0].cpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
        console.log(this.teste[i].cpfBarbeiro)
        console.log( this.barbeiros[0]?.cpf)
        this.pedidos.push(this.teste[i]); // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
    console.log(this.pedidos); // Log the result for verification
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      if (image) {
        const loading = await this.loadingController.create();
        await loading.present();

        const result = await this.avatarService.uploadBarberImage(image);
        loading.dismiss();

        if (!result) {
          const alert = await this.alertController.create({
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } else {
   
        console.log('Image capture canceled');
      }
    } catch (error) {
   
      console.error('Error capturing image:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'An error occurred while capturing the image.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async negarPedido(isOpen:boolean, id:string){
    await deleteDoc(doc(this.firestore, "pedidos", id));
    
    
    // Wait for a short time to allow Firebase to process the deletion
    setTimeout(() => {
      this.pedidos=[]
      this.listarBanco()
     }, 2000);
  
    // Reload the current route to refresh the page
    this.router.navigateByUrl('/tab3', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tab3']);
    });
  }
  
  async negar(isOpen:boolean, id:string){
    this.negarPedido(isOpen, id);
    const alert = await this.alertController.create({
      header: 'Pedido cancelado',
      message: '',
      buttons: ['OK'],
    });
  }
  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async listarPedidosFeitos(){
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        avaliacao: doc.data()['avaliacaoBarbeiro'],
        cpfBarbeiro: doc.data()['cpfBarbeiro'],
     
      });
    });
  
   
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.barbeiros[0].nome)
      const testeCpfBarbeiro = this.teste[i].cpfBarbeiro.toLowerCase();
      const barbeiroCpf = this.barbeiros[0].cpf.toLowerCase();
      


if (this.teste[i].cpfBarbeiro === this.barbeiros[0].cpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      
        this.pedidos_feitos.push(this.teste[i]); // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }

  }

  calculateAverageAvaliacao() {
    let sum = 0;
    let count = 0;
  
    for (const pedido of this.pedidos_feitos) {
      if (pedido.avaliacao) {
        sum += pedido.avaliacao;
        count++;
      } else{
        return "Sem avaliação"
      }
    }
  
    const average = count > 0 ? sum / count : 0;
    return average;

  }
}

