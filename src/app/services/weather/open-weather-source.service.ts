import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {WeatherSource} from './weather-source';
import {Weather} from '../../interfaces/weather';
import {Location} from '../../interfaces/location';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherSourceService implements WeatherSource {
  private readonly url: string;

  public constructor(private httpClient: HttpClient) {
    this.url = `http://api.openweathermap.org/data/2.5/weather?appid=${environment.openWeatherApiKey}&units=metric`;
  }

  public getWeatherResponse(location: Location): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}&lat=${location.lat}&lon=${location.lon}`);
  }

  public extractWeather(response: any): Weather {
    return {
      date: Date.now(),
      description: response.weather[0].description,
      temp: response.main.temp,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    };
  }

  public getSourceName(): string {
    return 'OpenWeatherMap';
  }

}
