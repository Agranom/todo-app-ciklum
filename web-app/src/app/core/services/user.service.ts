import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { USER_API_ROUTE } from '../constants';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  loadUser(): Observable<User> {
    return this.httpClient.get<User>(USER_API_ROUTE).pipe(
      map(response => deserialize(response, User))
    );
  }
}
