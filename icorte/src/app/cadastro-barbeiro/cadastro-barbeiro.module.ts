import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CadastroBarbeiroPageRoutingModule } from './cadastro-barbeiro-routing.module';
import { CadastroBarbeiroPage } from './cadastro-barbeiro.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CpfMaskModule } from '../Mask/cpf-mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBarbeiroPageRoutingModule,
    ReactiveFormsModule,
    CpfMaskModule
  ],
  declarations: [CadastroBarbeiroPage]
})
export class CadastroBarbeiroPageModule {}
