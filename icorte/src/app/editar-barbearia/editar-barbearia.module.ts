import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarBarbeariaPageRoutingModule } from './editar-barbearia-routing.module';

import { EditarBarbeariaPage } from './editar-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBarbeariaPageRoutingModule
  ],
  declarations: [EditarBarbeariaPage]
})
export class EditarBarbeariaPageModule {}
