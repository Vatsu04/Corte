import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuBarbeariaPageRoutingModule } from './menu-barbearia-routing.module';

import { MenuBarbeariaPage } from './menu-barbearia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuBarbeariaPageRoutingModule
  ],
  declarations: [MenuBarbeariaPage]
})
export class MenuBarbeariaPageModule {}
