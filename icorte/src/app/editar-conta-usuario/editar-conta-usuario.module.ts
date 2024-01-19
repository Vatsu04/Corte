import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContaUsuarioPageRoutingModule } from './editar-conta-usuario-routing.module';

import { EditarContaUsuarioPage } from './editar-conta-usuario.page';
import { CpfMaskDirective } from '../cpf-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarContaUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarContaUsuarioPage, CpfMaskDirective]
})
export class EditarContaUsuarioPageModule {}
