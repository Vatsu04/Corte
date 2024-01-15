import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContaBarbeiroPageRoutingModule } from './editar-conta-barbeiro-routing.module';

import { EditarContaBarbeiroPage } from './editar-conta-barbeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarContaBarbeiroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarContaBarbeiroPage]
})
export class EditarContaBarbeiroPageModule {}
