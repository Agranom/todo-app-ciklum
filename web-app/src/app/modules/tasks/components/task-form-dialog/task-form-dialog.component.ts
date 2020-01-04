import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskStatusEnum } from '../../constants';
import { Task } from '../../models';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss']
})
export class TaskFormDialogComponent {

  taskForm: FormGroup;
  isEditable: boolean;

  readonly statuses: TaskStatusEnum[] = Object.values(TaskStatusEnum);

  constructor(private fb: FormBuilder,
              private matDialogRef: MatDialogRef<TaskFormDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data: { task: Task }) {
    const task = (data && data.task) || null;
    this.isEditable = !!task;
    this.taskForm = this.buildForm(task);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.matDialogRef.close(this.taskForm.value);
    }
  }

  private buildForm(task: Task | null): FormGroup {
    return this.fb.group({
      title: [task && task.title || '', [Validators.required]],
      description: [task && task.description || '', [Validators.required]],
      status: task && task.status || TaskStatusEnum.Undone
    });
  }
}
