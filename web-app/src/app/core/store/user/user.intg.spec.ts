import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import * as faker from 'faker';
import { deserialize } from 'serialize-ts/dist';
import { AuthHttpInterceptor } from '../../interceptors/auth-http-interceptor';
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
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([UserEffects]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true },
        UserService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
    service = TestBed.get(UserService)
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
          payload: deserialize(user, User),
          loading: false,
          error: null
        };
        const spy = spyOn(service, 'loadUser');
        store.dispatch(LoadUserActions.loadUser());
        expect(spy).toHaveBeenCalledTimes(1)
        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('GET');

        req.flush(user);

        // store.pipe(select(selectUserState)).subscribe(state => expect(state).toEqual(expected));
      }));
    });
  });
});
