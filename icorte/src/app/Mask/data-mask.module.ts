import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import { DataMaskDirective } from './data-mask.directive';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [DataMaskDirective],
    exports: [DataMaskDirective]
})
export class DataMaskModule{
    
}