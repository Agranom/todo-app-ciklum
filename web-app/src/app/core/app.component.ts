import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';
import { AuthService } from '../modules/auth/services/auth.service';
import { AUTH_ROUTE, TASKS_ROUTE } from '../shared/constants';
import { User } from './models';
import { ClearUserActions, LoadUserActions, selectUser, UserState } from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  readonly tasksRoute = TASKS_ROUTE;

  constructor(private store: Store<UserState>,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.store.dispatch(LoadUserActions.loadUser());

    this.user$ = this.store.pipe(select(selectUser), shareReplay({ bufferSize: 1, refCount: true }));
    this.isLoggedIn$ = this.authService.isLoggedIn$.pipe();
  }

  signOut() {
    this.authService.signOut().pipe(first()).subscribe(() => {
      this.store.dispatch(ClearUserActions.clearUser());
      this.router.navigate([AUTH_ROUTE]);
    });
  }
}
