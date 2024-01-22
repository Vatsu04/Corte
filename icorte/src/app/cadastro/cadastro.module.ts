import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CpfMaskModule } from '../Mask/cpf-mask.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    CpfMaskModule

    
  ],
  declarations: [CadastroPage],
})
export class CadastroPageModule {}
