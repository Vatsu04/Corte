import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosBarbeariaPage } from './pedidos-barbearia.page';

describe('PedidosBarbeariaPage', () => {
  let component: PedidosBarbeariaPage;
  let fixture: ComponentFixture<PedidosBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
