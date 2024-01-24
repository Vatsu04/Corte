import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroBarbeariaPageRoutingModule } from './cadastro-barbearia-routing.module';

import { CadastroBarbeariaPage } from './cadastro-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBarbeariaPageRoutingModule
  ],
  declarations: [CadastroBarbeariaPage]
})
export class CadastroBarbeariaPageModule {}
