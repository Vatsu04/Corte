import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PedidosCompletosBarbeariaPage } from './pedidos-completos-barbearia.page';

describe('PedidosCompletosBarbeariaPage', () => {
  let component: PedidosCompletosBarbeariaPage;
  let fixture: ComponentFixture<PedidosCompletosBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosCompletosBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
