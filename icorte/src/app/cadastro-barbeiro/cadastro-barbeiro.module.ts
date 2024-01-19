import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CpfMaskDirective } from '../cpf-mask.directive';
import { CadastroBarbeiroPageRoutingModule } from './cadastro-barbeiro-routing.module';
import { CadastroBarbeiroPage } from './cadastro-barbeiro.page';
import { ReactiveFormsModule } from '@angular/forms';
import { DataMaskDirective } from '../data-mask.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBarbeiroPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CadastroBarbeiroPage, CpfMaskDirective, DataMaskDirective]
})
export class CadastroBarbeiroPageModule {}
