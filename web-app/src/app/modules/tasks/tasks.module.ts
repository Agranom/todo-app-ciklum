import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule {
}
