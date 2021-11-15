import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class AuthServiceMock {
    constructor() {}
    login() {
      return true;
    }
  }
  let authServiceMockInstance: AuthServiceMock;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: new AuthServiceMock() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    mockRouter = TestBed.inject(Router);
    authServiceMockInstance = new AuthServiceMock();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    authServiceMockInstance = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must be 2 inputs form', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('check username and validation', () => {
    const loginFormUserElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    const userNameValueFormGroup = component.loginForm.get('username');
    expect(loginFormUserElement.value).toEqual(userNameValueFormGroup.value);
    expect(userNameValueFormGroup.errors).not.toBeNull();
    expect(userNameValueFormGroup.errors.required).toBeTruthy();
  });

  it('Check username value and username errors', () => {
    const loginFormUserElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    loginFormUserElement.value = 'test';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameValueFormGroup = component.loginForm.get('username');
      expect(loginFormUserElement.value).toEqual(userNameValueFormGroup.value);
      expect(userNameValueFormGroup.errors).toBeNull();
    });
  });

  it('check login form is valid when validations are fulfilled', () => {
    const loginFormUserElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    const loginFormPasswordElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    loginFormUserElement.value = 'test';
    loginFormPasswordElement.value = '123456';
    loginFormUserElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    const isLoginFormValid = component.loginForm.valid;
    fixture.whenStable().then(() => {
      expect(isLoginFormValid).toBeTruthy();
    });
  });
  
  it('Login in authService had to be called', () => {
    const authServiceSpy = spyOn(authServiceMockInstance, 'login').and.returnValue(true);
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const loginFormUserElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    const loginFormPasswordElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    loginFormUserElement.value = 'test';
    loginFormPasswordElement.value = '123456';
    loginFormUserElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    button.click();
    fixture.whenStable().then(() => {
      expect(authServiceMockInstance.login).toHaveBeenCalledTimes(1);
    });
  });
});
