import { Component, ElementRef, OnInit } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu-barbearia',
  templateUrl: './menu-barbearia.page.html',
  styleUrls: ['./menu-barbearia.page.scss'],
})
export class MenuBarbeariaPage implements OnInit {
  profile: null | DocumentData | undefined = null;
  barbearias:any[] = [{nome:'', endereco:'', especialidade_tamanho_cabelo:'', especialidade_tipo_cabelo:'', email:'',   cep:'', foto:'', uid:''}];
  pedidos_feitos:any = []; // Usado apenas para calcular nota
  pedidos:any = []; // usado para listar os pedidos que foram aceitos  
  teste:any = []; 
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private firestore: Firestore,
    private el: ElementRef
  ) { }

  async ngOnInit() {
    await this.listarBanco();
    console.log(this.barbearias[0].nome)
    console.log(this.barbearias[0].email)
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }



  async listarBanco() {
    const userUID = await this.authService.getCurrentUserUID();
  
    if (userUID) {
      const userDoc = await getDoc(doc(this.firestore, "barberShops", userUID));
  
      if (userDoc.exists()) {
        console.log(`${userDoc.id} => ${userDoc.data()['nome']}`);
        this.barbearias = [{ 
          nome: userDoc.data()['nome'], 
          email: userDoc.data()['email'],
          especialidade_tamanho_cabelo: userDoc.data()['especialidade_tamanho_cabelo'],
          especialidade_tipo_cabelo: userDoc.data()['especialidade_tipo_cabelo'],
          endereco: userDoc.data()['endereco'],
          cep: userDoc.data()['cep'],
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


  async listarPedidosFeitos(){
    const querySnapshot = await getDocs(collection(this.firestore, "pedidos_feitos"));
    this.teste = []; // Clear the array before populating it
  
    querySnapshot.forEach((doc) => {
      this.teste.push({ 
        id: doc.id,
        avaliacao: doc.data()['avaliacaoBarbeiro'],
        cep: doc.data()['cep'],
     
      });
    });
  
   
   
    for (let i = 0; i < this.teste.length; i++) {
      

      


if (this.teste.cep === this.barbearias[0].cep) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
        console.log(this.teste.cep);
        console.log(this.barbearias[0].cep);
        this.pedidos_feitos[i] = this.teste[i]; // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
      }
    }

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
      

      


      if (this.teste.cep === this.barbearias[0].cep) { // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
              console.log(this.teste.cep);
              console.log(this.barbearias[0].cep);
              this.pedidos.push(this.teste[i]); // pedidos recebe os valores do teste caso esse pedido corresponder a esse barbeiro
            }
          }

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

        const result = await this.avatarService.uploadBarberShopImage(image);
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
