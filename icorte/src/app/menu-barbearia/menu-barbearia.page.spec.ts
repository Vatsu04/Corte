import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarbeariaPage } from './menu-barbearia.page';

describe('MenuBarbeariaPage', () => {
  let component: MenuBarbeariaPage;
  let fixture: ComponentFixture<MenuBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
