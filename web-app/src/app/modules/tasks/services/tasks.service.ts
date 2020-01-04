import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { TASKS_API_ROUTE } from '../constants';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) {
  }

  loadTasks(): Observable<Task[]> {
    return this.httpClient.get<{ items: Task[] }>(TASKS_API_ROUTE).pipe(
      map(({ items }) => items.map(i => deserialize(i, Task)))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post(TASKS_API_ROUTE, task).pipe(
      map(response => deserialize(response, Task))
    );
  }

  updateTaskById(id: string, task: Partial<Task>): Observable<{}> {
    const url = `${TASKS_API_ROUTE}/${id}`;

    return this.httpClient.put<{}>(url, task);
  }

  deleteTaskById(id: string): Observable<{}> {
    const url = `${TASKS_API_ROUTE}/${id}`;

    return this.httpClient.delete(url);
  }
}
