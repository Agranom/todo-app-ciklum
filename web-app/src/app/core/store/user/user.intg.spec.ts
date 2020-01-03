import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import * as faker from 'faker';
import { BaseHttpInterceptor } from '../../interceptors/base-http-interceptor';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { reducers } from '../reducers';
import { LoadUserActions } from './actions';
import { UserEffects } from './user.effects';
import { selectUserState } from './user.selectors';
import { UserState } from './user.state';

describe('User Store Integration', () => {
  let httpMock: HttpTestingController;
  let store: Store<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([UserEffects]),
        RouterTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true },
        UserService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  describe('loadUser', () => {
    const url = `http://localhost:3001/api/me`;
    const user: User = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };

    describe('loadUserSuccess', () => {

      it('should make an api call and return user from store', async(() => {
        const expected: UserState = {
          payload: user,
          loading: false,
          error: null
        };
        store.dispatch(LoadUserActions.loadUser());
        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('GET');

        req.flush(user);

        store.pipe(select(selectUserState)).subscribe(state => expect(state).toEqual(expected));
      }));
    });
  });
});
