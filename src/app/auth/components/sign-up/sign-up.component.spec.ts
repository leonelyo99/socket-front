import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  class AuthServiceMock {
    constructor() {}
    signUp() {
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
      declarations: [SignUpComponent],
      providers: [{ provide: AuthService, useValue: new AuthServiceMock() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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

  it('must be 4 inputs form', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#signUpForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(4);
  });

  it('check username and validation', () => {
    const signUpFormEmailElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[0];
    const emailValueFormGroup = component.signUpForm.get('email');
    expect(signUpFormEmailElement.value).toEqual(emailValueFormGroup.value);
    expect(emailValueFormGroup.errors).not.toBeNull();
    expect(emailValueFormGroup.errors.required).toBeTruthy();
  });

  it('Check username value and username errors', () => {
    const signUpFormEmailElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[0];
    signUpFormEmailElement.value = 'test@yopmail.com';
    signUpFormEmailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValueFormGroup = component.signUpForm.get('email');
      expect(signUpFormEmailElement.value).toEqual(emailValueFormGroup.value);
      expect(emailValueFormGroup.errors).toBeNull();
    });
  });

  it('check signUp form is valid when validations are fulfilled and authService had to be called', () => {
    const authServiceSpy = spyOn(
      authServiceMockInstance,
      'signUp'
    ).and.returnValue(true);

    const signUpFormEmailElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[0];

    const signUpFormUsernameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[1];

    const signUpFormPasswordElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[2];

    const signUpFormPasswordRepeatElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#signUpForm')
        .querySelectorAll('input')[3];

    const button = fixture.debugElement.nativeElement.querySelector('button');

    signUpFormEmailElement.value = 'test@test.com';
    signUpFormUsernameElement.value = 'test';
    signUpFormPasswordElement.value = '123456';
    signUpFormPasswordRepeatElement.value = '123456';

    signUpFormEmailElement.dispatchEvent(new Event('input'));
    signUpFormUsernameElement.dispatchEvent(new Event('input'));
    signUpFormPasswordElement.dispatchEvent(new Event('input'));
    signUpFormPasswordRepeatElement.dispatchEvent(new Event('input'));

    const isSignUpFormValid = component.signUpForm.valid;
    button.click();
    fixture.whenStable().then(() => {
      expect(isSignUpFormValid).toBeTruthy();
      expect(authServiceMockInstance.signUp).toHaveBeenCalledTimes(1);
    });
  });
});
