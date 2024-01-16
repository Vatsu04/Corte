import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPendenteBarbeiroPage } from './pedido-pendente-barbeiro.page';

describe('PedidoPendenteBarbeiroPage', () => {
  let component: PedidoPendenteBarbeiroPage;
  let fixture: ComponentFixture<PedidoPendenteBarbeiroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoPendenteBarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
