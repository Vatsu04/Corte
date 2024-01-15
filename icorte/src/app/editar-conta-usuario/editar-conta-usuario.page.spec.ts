import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContaUsuarioPage } from './editar-conta-usuario.page';

describe('EditarContaUsuarioPage', () => {
  let component: EditarContaUsuarioPage;
  let fixture: ComponentFixture<EditarContaUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarContaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
