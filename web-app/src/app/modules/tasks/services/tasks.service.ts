import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from '../../../../environments/environment';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly taskApi = `${environment.svcHostUrls.taskSvc}/api/task`;

  constructor(private httpClient: HttpClient) {
  }

  loadTasks(): Observable<Task[]> {
    return this.httpClient.get<{ items: Task[] }>(this.taskApi).pipe(
      map(({ items }) => items.map(i => deserialize(i, Task)))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post(this.taskApi, task).pipe(
      map(response => deserialize(response, Task))
    );
  }

  updateTaskById(id: string, task: Partial<Task>): Observable<{}> {
    const url = `${this.taskApi}/${id}`;

    return this.httpClient.put<{}>(url, task);
  }

  deleteTaskById(id: string): Observable<{}> {
    const url = `${this.taskApi}/${id}`;

    return this.httpClient.delete(url);
  }
}
