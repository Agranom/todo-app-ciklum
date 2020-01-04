import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, shareReplay, take } from 'rxjs/operators';
import { Task } from '../../models';
import { CreateTaskActions, isLoading, LoadTasksActions, selectTasks, TasksState } from '../../store/tasks';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  isLoading$: Observable<boolean>;
  displayedColumns = ['title', 'description', 'status', 'createdAt', 'actions'];

  constructor(private store: Store<TasksState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(LoadTasksActions.loadTasks());

    this.tasks$ = this.store.pipe(select(selectTasks), shareReplay({ bufferSize: 1, refCount: true }));
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  addTask(): void {
    this.openTaskFormDialog().afterClosed().pipe(
      filter(task => !!task),
      take(1)
    ).subscribe((task: Partial<Task>) => this.store.dispatch(CreateTaskActions.createTask({ task })));
  }

  private openTaskFormDialog(data?: { task: Task }): MatDialogRef<TaskFormDialogComponent> {
    return this.dialog.open(TaskFormDialogComponent, {
      width: '320px',
      data
    });
  }
}
