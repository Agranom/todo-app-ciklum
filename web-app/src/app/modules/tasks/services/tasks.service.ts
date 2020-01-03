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
}
