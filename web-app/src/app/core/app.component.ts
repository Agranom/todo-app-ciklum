import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models';
import { LoadUserActions, selectUser, UserState } from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<UserState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(LoadUserActions.loadUser());

    this.user$ = this.store.pipe(select(selectUser));
  }
}
