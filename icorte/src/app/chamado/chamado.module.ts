import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChamadoPageRoutingModule } from './chamado-routing.module';

import { ChamadoPage } from './chamado.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CatalogoPageRoutingModule } from '../catalogo/catalogo-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChamadoPageRoutingModule,
    ReactiveFormsModule,

    AngularFirestoreModule,

    CatalogoPageRoutingModule
  ],
  declarations: [ChamadoPage]
})
export class ChamadoPageModule {}
