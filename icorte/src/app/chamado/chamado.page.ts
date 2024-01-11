import { Component, OnInit } from '@angular/core';
import { CatalogoPage } from '../catalogo/catalogo.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.page.html',
  styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    
   
  });
  images: any = [];
  imgSrc: any;
  isImg: boolean = false;
  foto: any;
  barber:any = [{nome: CatalogoPage.barber.nome, email: CatalogoPage.barber.email}]
  constructor(
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  async chamarBabeiro(){
    
  }
  selectImage(img: any, modal: any) {
    this.imgSrc = img
    this.isImg = true
    modal.dismiss()//fechar modal
  }

  carregarFoto(e: any) {
    this.foto = e.target.files[0]
    const newName = uuidv4(this.foto.name)
    this.imageRef = ref(this.storage, `Produtos/${newName}`)
    uploadBytes(this.imageRef, this.foto)
    setTimeout(() => {
      this.images=[]
      this.listarProdutos()
     }, 2000);
  }
  
}
