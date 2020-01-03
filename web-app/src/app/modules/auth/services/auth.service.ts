import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { SIGN_IN_API_ROUTE, SIGN_UP_API_ROUTE } from '../constants';
import { NewUser, UserToken } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly authKey = 'auth/web-app';
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token);

  constructor(private httpClient: HttpClient) {
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable().pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  get token(): string {
    return sessionStorage.getItem(this.authKey);
  }

  signUp(newUser: NewUser): Observable<UserToken> {
    return this.httpClient.post<UserToken>(SIGN_UP_API_ROUTE, newUser).pipe(
      map(response => deserialize(response, UserToken)),
      tap(({ token }) => this.saveToken(token)),
      tap(() => this._isLoggedIn$.next(true))
    );
  }

  signIn(email: string, password: string): Observable<UserToken> {
    return this.httpClient.post<UserToken>(SIGN_IN_API_ROUTE, { email, password }).pipe(
      map(response => deserialize(response, UserToken)),
      tap(({ token }) => this.saveToken(token)),
      tap(() => this._isLoggedIn$.next(true))
    );
  }

  signOut(): Observable<void> {
    return of(sessionStorage.removeItem(this.authKey)).pipe(
      tap(() => this._isLoggedIn$.next(false))
    );
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.authKey, token);
  }
}
