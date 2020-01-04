import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { Task } from '../../models';
import { TasksService } from '../../services/tasks.service';
import { CreateTaskActions, LoadTasksActions, UpdateTaskActions } from './actions';

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

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTaskActions.createTask),
      exhaustMap(({ task }) => this.tasksService.createTask(task).pipe(
        map((newTask: Task) => CreateTaskActions.createTaskSuccess({ newTask })),
        catchError((error: ErrorResponse) => of(CreateTaskActions.createTaskFailure({ error })))
      ))
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateTaskActions.updateTask),
      exhaustMap(({ id, task }) => this.tasksService.updateTaskById(id, task).pipe(
        map(() => UpdateTaskActions.updateTaskSuccess({
          updatedTask: { id, changes: task }
        })),
        catchError((error: ErrorResponse) => of(UpdateTaskActions.updateTaskFailure({ error })))
      ))
    )
  );

  constructor(private tasksService: TasksService,
              private actions$: Actions) {
  }
}
