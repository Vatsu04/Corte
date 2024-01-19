import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Remove non-numeric characters
    if (input.length > 3) {
      input = input.substring(0, 3) + '.' + input.substring(3);
    }
    if (input.length > 7) {
      input = input.substring(0, 7) + '.' + input.substring(7);
    }
    if (input.length > 11) {
      input = input.substring(0, 11) + '-' + input.substring(11);
    }
    this.el.nativeElement.value = input;
  }
}
