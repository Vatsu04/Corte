import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChamarBarbeariaPage } from './chamar-barbearia.page';

describe('ChamarBarbeariaPage', () => {
  let component: ChamarBarbeariaPage;
  let fixture: ComponentFixture<ChamarBarbeariaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChamarBarbeariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
