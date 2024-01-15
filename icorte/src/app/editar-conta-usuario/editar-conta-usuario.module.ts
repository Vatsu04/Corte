import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContaUsuarioPageRoutingModule } from './editar-conta-usuario-routing.module';

import { EditarContaUsuarioPage } from './editar-conta-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarContaUsuarioPageRoutingModule
  ],
  declarations: [EditarContaUsuarioPage]
})
export class EditarContaUsuarioPageModule {}
