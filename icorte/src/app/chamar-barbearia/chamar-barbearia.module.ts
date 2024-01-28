import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChamarBarbeariaPageRoutingModule } from './chamar-barbearia-routing.module';

import { ChamarBarbeariaPage } from './chamar-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChamarBarbeariaPageRoutingModule,
     ReactiveFormsModule
  ],
  declarations: [ChamarBarbeariaPage]
})
export class ChamarBarbeariaPageModule {}
