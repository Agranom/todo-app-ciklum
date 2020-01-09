import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = environment.svcHostUrls.authSvc;

  constructor(private httpClient: HttpClient) {
  }

  loadUser(): Observable<User> {
    const url = `${this.baseUrl}/api/me`;

    return this.httpClient.get<User>(url).pipe(
      map(response => deserialize(response, User))
    );
  }
}
