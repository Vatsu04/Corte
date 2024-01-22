import { CpfMaskDirective } from './cpf-mask.directive';
import { ElementRef } from '@angular/core';

describe('CpfMaskDirective', () => {
  it('should create an instance', () => {
    // Create a mock ElementRef
    const elMock: ElementRef = {} as ElementRef;

    // Instantiate the directive with the mock ElementRef
    const directive = new CpfMaskDirective(elMock);

    // Check if the directive instance is created successfully
    expect(directive).toBeTruthy();
  });
});
