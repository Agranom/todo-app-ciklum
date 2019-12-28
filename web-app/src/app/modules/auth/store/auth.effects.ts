import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { UserToken } from '../models';
import { AuthService } from '../services/auth.service';
import { SignInActions, SignUpActions } from './actions';

@Injectable()
export class AuthEffects {

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.signUp),
      exhaustMap(({ newUser }) => this.authService.signUp(newUser).pipe(
        map((token: UserToken) => SignUpActions.signUpSuccess({ token })),
        catchError(error => of(SignUpActions.signUpFailure({ error })))
      ))
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignInActions.signIn),
      exhaustMap(({ email, password }) => this.authService.signIn(email, password).pipe(
        map((token: UserToken) => SignInActions.signInSuccess({ token })),
        catchError(error => of(SignInActions.signInFailure({ error })))
      ))
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.signUpSuccess, SignInActions.signInSuccess),
      tap(() => this.router.navigate(['/']))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
