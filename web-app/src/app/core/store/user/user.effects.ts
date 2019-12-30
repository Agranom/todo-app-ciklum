import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { LoadUserActions } from './actions';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadUserActions.loadUser),
      exhaustMap(() => this.userService.loadUser().pipe(
        map((user: User) => LoadUserActions.loadUserSuccess({ user })),
        catchError((error: ErrorResponse) => of(LoadUserActions.loadUserFailure({ error })))
      ))
    )
  );

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}
