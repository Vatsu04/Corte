import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDataMask]'
})
export class DataMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Remove non-numeric characters

    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }

    if (input.length > 5) {
      input = input.substring(0, 5) + '/' + input.substring(5, 9);
    }
    
    this.el.nativeElement.value = input;
  }
}
