import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import * as faker from 'faker';
import { deserialize } from 'serialize-ts/dist';
import { BaseHttpInterceptor } from '../../../../core/interceptors/base-http-interceptor';
import { TaskStatusEnum } from '../../constants';
import { Task } from '../../models';
import { reducers } from '../reducers';
import { LoadTasksActions } from './actions';
import { TasksEffects } from './tasks.effects';
import { selectTasksState } from './tasks.selectors';
import { TasksState } from './tasks.state';

describe('Tasks Store Integration', () => {
  let httpMock: HttpTestingController;
  let store: Store<TasksState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('tasks', reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TasksEffects])
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  describe('loadTasks', () => {
    const url = 'http://localhost:3000/api/task';
    const tasks: Task[] = [{
      id: faker.random.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      status: TaskStatusEnum.Undone,
      createdAt: new Date().toISOString()
    }].map(i => deserialize(i, Task));

    describe('loadTasksSuccess', () => {

      it('should make an api call and return state with tasks', async(() => {
        const expected: TasksState = {
          entities: {
            [tasks[0]['id']]: tasks[0]
          },
          ids: [tasks[0].id],
          loading: false
        };
        store.dispatch(LoadTasksActions.loadTasks());
        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('GET');
        req.flush({ items: tasks });

        store.pipe(select(selectTasksState)).subscribe(state => expect(state).toEqual(expected));
      }));
    });
  });
});
