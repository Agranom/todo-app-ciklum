import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { SIGN_IN_API_ROUTE, SIGN_UP_API_ROUTE } from '../constants';
import { NewUser, UserToken } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authKey = 'auth/web-app';

  constructor(private httpClient: HttpClient) {
  }

  get token(): string {
    return sessionStorage.getItem(this.authKey);
  }

  signUp(newUser: NewUser): Observable<UserToken> {
    return this.httpClient.post<UserToken>(SIGN_UP_API_ROUTE, newUser).pipe(
      map(response => deserialize(response, UserToken)),
      tap(({ token }) => this.saveToken(token))
    );
  }

  signIn(email: string, password: string): Observable<UserToken> {
    return this.httpClient.post<UserToken>(SIGN_IN_API_ROUTE, { email, password }).pipe(
      map(response => deserialize(response, UserToken)),
      tap(({ token }) => this.saveToken(token))
    );
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.authKey, token);
  }
}
