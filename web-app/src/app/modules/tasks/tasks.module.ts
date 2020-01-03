import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TASKS_FEATURE_NAME } from './store/feature-name';
import { reducers } from './store/reducers';
import { TasksEffects } from './store/tasks';

import { TasksRoutingModule } from './tasks-routing.module';


@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    StoreModule.forFeature(TASKS_FEATURE_NAME, reducers),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule {
}
