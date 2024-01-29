import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroBarbeariaPageRoutingModule } from './cadastro-barbearia-routing.module';

import { CadastroBarbeariaPage } from './cadastro-barbearia.page';
import { CepMaskModule } from '../Mask/cep-mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBarbeariaPageRoutingModule,
    ReactiveFormsModule,
    CepMaskModule
  ],
  declarations: [CadastroBarbeariaPage]
})
export class CadastroBarbeariaPageModule {}
