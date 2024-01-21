import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFirestoreModule,
    IonicModule,
    CatalogoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
