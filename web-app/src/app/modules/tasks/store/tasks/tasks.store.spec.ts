import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import * as faker from 'faker';
import { filter } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { BaseHttpInterceptor } from '../../../../core/interceptors/base-http-interceptor';
import { TaskStatusEnum } from '../../constants';
import { Task } from '../../models';
import { reducers } from '../reducers';
import { CreateTaskActions, LoadTasksActions, UpdateTaskActions } from './actions';
import { TasksEffects } from './tasks.effects';
import { selectTasks, selectTasksState } from './tasks.selectors';
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

  describe('createTask', () => {
    const url = 'http://localhost:3000/api/task';
    const body: Partial<Task> = {
      title: faker.random.word(),
      description: faker.random.words()
    };

    describe('createTaskSuccess', () => {

      it('should make an api call and return created task from state', async(() => {
        const expectedTask: Task = deserialize({
          id: faker.random.uuid(),
          title: faker.random.word(),
          description: faker.random.words(),
          status: TaskStatusEnum.Undone,
          createdAt: new Date().toISOString()
        }, Task);
        store.dispatch(CreateTaskActions.createTask({ task: body }));

        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);

        req.flush(expectedTask);

        store.pipe(select(selectTasks)).pipe(filter(tasks => tasks.some(t => t.id === expectedTask.id)))
          .subscribe(tasks => expect(tasks[0]).toEqual(expectedTask));
      }));
    });
  });

  describe('updateTask', () => {
    const existedTask: Task = deserialize({
      id: faker.random.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      status: TaskStatusEnum.Undone,
      createdAt: new Date().toISOString()
    }, Task);
    const url = `http://localhost:3000/api/task/${existedTask.id}`;

    describe('updateTaskSuccess', () => {

      beforeEach(() => {
        store.dispatch(CreateTaskActions.createTaskSuccess({ newTask: existedTask }));
      });

      it('should make an api call and update existed task in store', async(() => {
        const body: Partial<Task> = {
          title: faker.random.word()
        };
        store.dispatch(UpdateTaskActions.updateTask({ id: existedTask.id, task: body }));

        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(body);

        req.flush({}, { status: 204, statusText: 'No Content' });

        store.pipe(select(selectTasks), filter(tasks => tasks.some(t => t.id === existedTask.id)))
          .subscribe(tasks => {
            expect({ ...existedTask, title: body.title }).toEqual(tasks[0]);
          });
      }));
    });
  });
});
