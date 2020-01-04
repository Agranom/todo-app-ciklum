import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Task } from '../../models';
import { LoadTasksActions, selectTasks, TasksState } from '../../store/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  displayedColumns = ['title', 'description', 'status', 'createdAt', 'actions'];

  constructor(private store: Store<TasksState>) {
  }

  ngOnInit() {
    this.store.dispatch(LoadTasksActions.loadTasks());

    this.tasks$ = this.store.pipe(select(selectTasks), shareReplay({ bufferSize: 1, refCount: true }));
  }

  addTask(): void {

  }

}
