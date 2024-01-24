import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarBarbeariaPage } from './editar-barbearia.page';

describe('EditarBarbeariaPage', () => {
  let component: EditarBarbeariaPage;
  let fixture: ComponentFixture<EditarBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
