import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import { CpfMaskDirective } from './cpf-mask.directive';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [CpfMaskDirective],
    exports: [CpfMaskDirective]
})
export class CpfMaskModule{
    
}