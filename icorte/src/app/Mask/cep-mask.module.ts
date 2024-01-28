import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import { CepMaskDirective } from './cep-mask.directive';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [CepMaskDirective],
    exports: [CepMaskDirective]
})
export class CepMaskModule{
    
}