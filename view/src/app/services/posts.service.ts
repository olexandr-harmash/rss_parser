import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { IPost, IRssResponse, ISendPost } from '../models/posts';
import { CookieService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private cookieService: CookieService
  ) {}

  posts: IPost[] = [];

  length: number;

  getAll(limit: number = 25, page: number = 0): Observable<IRssResponse> {
    return this.http
      .get<IRssResponse>('http://localhost:5000/api/v1/posts/', {
        params: new HttpParams({
          fromObject: { limit: limit, offset: limit * page },
        }),
      })
      .pipe(
        retry(5),
        tap(posts => {
          this.posts = posts.message;
          this.length = posts.count;
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(post: ISendPost): Observable<IRssResponse> {
    console.log(`Bearer ${this.cookieService.getCookie('token')}`);
    return this.http
      .post<IRssResponse>('http://localhost:5000/api/v1/posts/', post, {
        headers: {
          Authorization: `Bearer ${this.cookieService.getCookie('token')}`,
        },
      })
      .pipe(
        tap(posts => {
          posts.message.forEach(post => this.posts.push(post));
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
