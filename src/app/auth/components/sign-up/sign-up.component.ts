import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User.model';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public seePassword: boolean = false;
  public seeRepeatPassword: boolean = false;

  constructor(private authService: AuthService, public router: Router) {
    this.form = new FormGroup(
      {
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
          Validators.minLength(4),
        ]),
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {}

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('repeatPassword').value;
    return pass === confirmPass ? null : { notequal: true };
  };

  signUp(): void {
    this.authService
      .signup(new User(this.form.value.username, this.form.value.password, this.form.value.email))
      .subscribe((resp: boolean) => resp && this.router.navigate(['/page']));
  }

  handleSeePassword(): void{
    this.seePassword = !this.seePassword;
  }

  handleSeeRepeatPassword(): void{
    this.seeRepeatPassword = !this.seeRepeatPassword;
  }
}
