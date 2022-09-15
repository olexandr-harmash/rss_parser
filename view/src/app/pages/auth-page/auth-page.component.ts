import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  isLogging = true;

  form = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    name: new FormControl<string>(''),
  });

  get password() {
    return this.form.controls.password;
  }
  get email() {
    return this.form.controls.email;
  }
  get name() {
    return this.form.controls.name;
  }

  loginUser() {
    this.authService
      .login({
        email: this.email.value as string,
        password: this.password.value as string,
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  registerUser() {
    this.authService
      .register({
        email: this.email.value as string,
        password: this.password.value as string,
        name: this.name.value as string,
      })
      .subscribe(() => {});
  }
}
