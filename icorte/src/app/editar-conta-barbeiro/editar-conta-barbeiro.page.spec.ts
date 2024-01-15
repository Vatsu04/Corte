import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContaBarbeiroPage } from './editar-conta-barbeiro.page';

describe('EditarContaBarbeiroPage', () => {
  let component: EditarContaBarbeiroPage;
  let fixture: ComponentFixture<EditarContaBarbeiroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarContaBarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
