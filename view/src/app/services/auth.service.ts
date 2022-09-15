import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { IToken, IUserLogin, IUserRegister } from '../models/user';
import { CookieService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private cookieService: CookieService
  ) {}

  login(user: IUserLogin): Observable<IToken> {
    console.log(user);
    return this.http
      .post<IToken>('http://localhost:5000/api/v1/login', user)
      .pipe(
        retry(5),
        tap(token => {
          console.log(token);
          this.cookieService.setCookie({
            name: 'token',
            value: token.token,
            expireDays: 1,
          });
          console.log(this.cookieService.getCookie('token'));
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  register(user: IUserRegister): Observable<IToken> {
    console.log(`Bearer ${this.cookieService.getCookie('token')}`);
    return this.http
      .post<IToken>('http://localhost:5000/api/v1/register', user)
      .pipe(
        tap(token => {
          console.log(token);
          this.cookieService.setCookie({
            name: 'token',
            value: token.token,
            expireDays: 1,
          });
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
