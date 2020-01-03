import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadTasksActions, selectTasks, TasksState } from '../../store/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private store: Store<TasksState>) { }

  ngOnInit() {
    this.store.dispatch(LoadTasksActions.loadTasks());

    this.store.pipe(select(selectTasks)).subscribe(console.log)
  }

}
