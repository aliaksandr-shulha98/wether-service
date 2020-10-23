import {Injectable} from '@angular/core';
import {WeatherSource} from './weather-source';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Location} from '../../interfaces/location';
import {Observable} from 'rxjs';
import {Weather} from '../../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherbitSourceService implements WeatherSource {
  private readonly url: string;

  public constructor(private httpClient: HttpClient) {
    this.url = `http://api.weatherbit.io/v2.0/current?key=${environment.weatherbitApiKey}`;
  }

  public getWeatherResponse(location: Location): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}&lat=${location.lat}&lon=${location.lon}`);
  }

  public extractWeather(response: any): Weather {
    return {
      date: Date.now(),
      description: response.data[0].weather.description,
      temp: response.data[0].temp,
      humidity: response.data[0].rh,
      windSpeed: response.data[0].wind_spd,
      icon: `https://www.weatherbit.io/static/img/icons/${response.data[0].weather.icon}.png`
    };
  }

  public getSourceName(): string {
    return 'Weatherbit';
  }
}
