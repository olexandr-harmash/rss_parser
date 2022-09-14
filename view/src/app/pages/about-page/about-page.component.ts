import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  isLogging = true;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
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
    this.authService.login({
      email: this.email.value as string,
      password: this.password.value as string,
    });
  }

  registerUser() {
    this.authService.register({
      email: this.email.value as string,
      password: this.password.value as string,
      name: this.name.value as string,
    });
  }
}
