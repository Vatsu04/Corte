import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PedidosCompletosBarbeiroPage } from './pedidos-completos-barbeiro.page';

describe('PedidosCompletosBarbeiroPage', () => {
  let component: PedidosCompletosBarbeiroPage;
  let fixture: ComponentFixture<PedidosCompletosBarbeiroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosCompletosBarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
