import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DataMaskDirective } from '../data-mask.directive';
import { CadastroPageRoutingModule } from './cadastro-routing.module';
import { CpfMaskDirective } from '../cpf-mask.directive';
import { CadastroPage } from './cadastro.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CadastroPage],
})
export class CadastroPageModule {}
