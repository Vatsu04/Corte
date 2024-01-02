import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginBarbeiroPage } from './login-barbeiro.page';

describe('LoginBarbeiroPage', () => {
  let component: LoginBarbeiroPage;
  let fixture: ComponentFixture<LoginBarbeiroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginBarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
