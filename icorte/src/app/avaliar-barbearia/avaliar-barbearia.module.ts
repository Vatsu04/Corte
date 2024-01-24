import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarBarbeariaPageRoutingModule } from './avaliar-barbearia-routing.module';

import { AvaliarBarbeariaPage } from './avaliar-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarBarbeariaPageRoutingModule
  ],
  declarations: [AvaliarBarbeariaPage]
})
export class AvaliarBarbeariaPageModule {}
