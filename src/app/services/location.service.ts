import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../entities/location';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string;
  ip: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://ip-api.com/json';
  }

  getLocation(): Observable<Location> {
    return this.httpClient.get('http://api.ipify.org/?format=json').pipe(
      mergeMap((res: any) => this.httpClient.get<Location>(`${this.url}/${res.ip}`)),
    );
  }
}
