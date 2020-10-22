import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `https://ipinfo.io?token=${environment.locationApiKey}`;
  }

  getCurrentLocation(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}`);
  }
}
