import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DataMaskDirective } from './data-mask.directive';

@Component({
  template: '<input appDataMask>',
})
class TestComponent {}

describe('DataMaskDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DataMaskDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.nativeElement.querySelector('input').injector.get(DataMaskDirective);
    expect(directive).toBeTruthy();
  });
});
