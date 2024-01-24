import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliarBarbeariaPage } from './avaliar-barbearia.page';

describe('AvaliarBarbeariaPage', () => {
  let component: AvaliarBarbeariaPage;
  let fixture: ComponentFixture<AvaliarBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvaliarBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
