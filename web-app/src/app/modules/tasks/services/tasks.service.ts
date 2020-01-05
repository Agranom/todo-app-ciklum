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

  constructor(private httpClient: HttpClient) {
  }

  loadTasks(): Observable<Task[]> {
    const url = `${environment.svcBaseUrls.taskSvc}/api/task`;

    return this.httpClient.get<{ items: Task[] }>(url).pipe(
      map(({ items }) => items.map(i => deserialize(i, Task)))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    const url = `${environment.svcBaseUrls.taskSvc}/api/task`;

    return this.httpClient.post(url, task).pipe(
      map(response => deserialize(response, Task))
    );
  }

  updateTaskById(id: string, task: Partial<Task>): Observable<{}> {
    const url = `${environment.svcBaseUrls.taskSvc}/api/task/${id}`;

    return this.httpClient.put<{}>(url, task);
  }

  deleteTaskById(id: string): Observable<{}> {
    const url = `${environment.svcBaseUrls.taskSvc}/api/task/${id}`;

    return this.httpClient.delete(url);
  }
}
