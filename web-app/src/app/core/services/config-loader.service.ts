import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigLoader {

  private readonly configUrl = 'assets/config/config.json';

  constructor(private httpClient: HttpClient) {
  }

  initConfig(): Promise<void> {
    return this.httpClient.get(this.configUrl).pipe(
      map(config => {
        window.config = config;
        return;
      })
    ).toPromise();
  }
}
