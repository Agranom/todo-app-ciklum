import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Task } from '../../models';

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter();
