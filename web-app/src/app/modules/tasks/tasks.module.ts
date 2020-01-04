import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskFormDialogComponent } from './components/task-form-dialog/task-form-dialog.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TASKS_FEATURE_NAME } from './store/feature-name';
import { reducers } from './store/reducers';
import { TasksEffects } from './store/tasks';

import { TasksRoutingModule } from './tasks-routing.module';


@NgModule({
  declarations: [TaskListComponent, TaskFormDialogComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    StoreModule.forFeature(TASKS_FEATURE_NAME, reducers),
    EffectsModule.forFeature([TasksEffects]),
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TaskFormDialogComponent
  ],
})
export class TasksModule {
}
