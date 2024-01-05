import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginBarbeiroPageRoutingModule } from './login-barbeiro-routing.module';

import { LoginBarbeiroPage } from './login-barbeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginBarbeiroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginBarbeiroPage],
})
export class LoginBarbeiroPageModule {}
