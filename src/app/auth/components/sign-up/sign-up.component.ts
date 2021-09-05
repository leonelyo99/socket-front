import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService, public router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {}
  
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    const pass = group.get('password').value;
    const confirmPass = group.get('repeatPassword').value
    return pass === confirmPass ? null : { notequal: true }
  }

  signUp() {
    console.log('submit', this.form.value);
    this.authService.signup(this.form.value).subscribe(resp => resp && this.router.navigate(['/page']))
  }
}
