import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData, Firestore, collection, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  profile: null | DocumentData | undefined = null;
  userProfile: { nome: string; cpf: string; email: string; endereco: string } | null = null;
  usuarios: any = [{email:'', nome:''}];
  teste:any = [];
  pedidos_feitos: any = [];
  chamados:any =[];
  isToastOpen:boolean = false;
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
   
    private firestore: Firestore
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async avaliarBarbeiros(){
    this.router.navigateByUrl('/pedidos-completos-cliente', { replaceUrl: true });
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
        const userDoc2 = await getDoc(doc(this.firestore, "barbers", userUID));
        if(userDoc2.exists()){
          this.router.navigateByUrl('/tab3', { replaceUrl: true });
        } else{
          this.router.navigateByUrl('/menu-barbearia', {replaceUrl:true});
        }
      }
    } else {
      console.error('User UID not available');
    }
    return Promise.resolve(); // Resolve the promise when the function completes
  }
  
  

  async ngOnInit() {
    await this.listarBanco();
    console.log(this.usuarios[0].nome)
    this.listarPedidosFeitos();
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

        const result = await this.avatarService.uploadImage(image);
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


  async listarPedidosFeitos(){
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        avaliacao: doc.data()['avaliacaoCliente'],
        cpfCliente: doc.data()['cpfCliente'],
        
      });
    });
  
    this.pedidos_feitos = []; // Initialize pedidos as an empty array
   
    for (let i = 0; i < this.teste.length; i++) {
      console.log(this.teste[i].cpfCliente)
      console.log( this.usuarios[0]?.cpf)
     
      


if (this.teste[i].cpfCliente === this.usuarios[0].cpf) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
       
     this.pedidos_feitos.push(this.teste[i]);; // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }
   
  }

  async listarChamados() {
    const querySnapshot = await getDocs(collection(this.firestore, "chamados"));
    this.teste = []; // Clear the array before populating it

  
    querySnapshot.forEach((doc) => {
      
      this.teste = [...this.teste, { 
      id: doc.id,
      corteAtual: doc.data()['corteAtual'],
      nomeCliente: doc.data()['nomeCliente'], 
      emailCliente: doc.data()['emailCliente'],
      cpfCliente: doc.data()['cpfCliente'],
      nomeBarbeiro: doc.data()['nomeBarbeiro'], 
      emailBarbeiro: doc.data()['emailBarbeiro'],
      cpfBarbeiro: doc.data()['cpfBarbeiro'],
      descricao: doc.data()['descricao'],
      hora: doc.data()['hora'],
      data: doc.data()['data'],
      local: doc.data()['local'], 
      preco: doc.data()['preco'],
      imageUrl: doc.data()['imageUrl'] }]
    });
  
    
   
    for (let i = 0; i < this.teste.length; i++) {

      if(this.teste[i].cpfBarbeiro === this.usuarios[0].cpf){
        this.chamados.push(this.teste[i]);
      }
    }
    }

    async negarPedido(isOpen:boolean, id:string){
      await deleteDoc(doc(this.firestore, "chamados", id));
      
      
      // Wait for a short time to allow Firebase to process the deletion
      setTimeout(() => {
        this.chamados=[]
        this.listarBanco()
       }, 2000);
    
      // Reload the current route to refresh the page
      this.router.navigateByUrl('/tab3', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tab3']);
      });
    }
    
    async negar(isOpen:boolean, id:string){
      this.negarPedido(isOpen, id);
      this.mensagem(isOpen);
    }
    mensagem(isOpen: boolean) {
      this.isToastOpen = isOpen;
    }
  


  calculateAverageAvaliacao() {
    let sum = 0;
    let count = 0;
  
    for (const pedido of this.pedidos_feitos) {
      if (pedido.avaliacao) {
        sum += pedido.avaliacao;
        count++;
      } else{
        return "Sem avaliação";
      }
    }
  
    const average = count > 0 ? sum / count : 0;
    return average;

  }
}
