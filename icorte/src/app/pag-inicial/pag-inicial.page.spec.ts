import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PagInicialPage } from './pag-inicial.page';

describe('PagInicialPage', () => {
  let component: PagInicialPage;
  let fixture: ComponentFixture<PagInicialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
