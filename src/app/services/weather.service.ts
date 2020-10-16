import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `http://api.openweathermap.org/data/2.5/weather?appid=${environment.weatherApiKey}`;
  }

  getWeather(lat: string, lon: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}&lat=${lat}&lon=${lon}`);
  }
}
