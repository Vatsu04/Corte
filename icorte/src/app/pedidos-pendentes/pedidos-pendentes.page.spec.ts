import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PedidosPendentesPage } from './pedidos-pendentes.page';

describe('PedidosPendentesPage', () => {
  let component: PedidosPendentesPage;
  let fixture: ComponentFixture<PedidosPendentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosPendentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
