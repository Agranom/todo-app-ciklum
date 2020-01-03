import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { Task } from '../../models';
import { TasksService } from '../../services/tasks.service';
import { LoadTasksActions } from './actions';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadTasksActions.loadTasks),
      exhaustMap(() => this.tasksService.loadTasks().pipe(
        map((tasks: Task[]) => LoadTasksActions.loadTasksSuccess({ tasks })),
        catchError((error: ErrorResponse) => of(LoadTasksActions.loadTasksFailure({ error })))
      ))
    )
  );

  constructor(private tasksService: TasksService,
              private actions$: Actions) {
  }
}