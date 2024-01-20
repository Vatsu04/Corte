import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosCompletosClientePage } from './pedidos-completos-cliente.page';

describe('PedidosCompletosClientePage', () => {
  let component: PedidosCompletosClientePage;
  let fixture: ComponentFixture<PedidosCompletosClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosCompletosClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
