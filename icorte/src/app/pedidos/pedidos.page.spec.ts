import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PedidosPage } from './pedidos.page';

describe('PedidosPage', () => {
  let component: PedidosPage;
  let fixture: ComponentFixture<PedidosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
