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

  constructor(private httpClient: HttpClient) {
    this.url = `http://api.openweathermap.org/data/2.5/weather?appid=${environment.weatherApiKey}&units=metric`;
  }

  getWeatherResponse(location: Location): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}&lat=${location.lat}&lon=${location.lon}`);
  }

  extractWeather(response: any): Weather {
    const weather: Weather = new Weather();
    weather.date = Date.now();
    weather.description = response.weather[0].description;
    weather.temp = response.main.temp;
    weather.humidity = response.main.humidity;
    weather.windSpeed = response.wind.speed;
    weather.icon = response.weather[0].icon;
    return weather;
  }

}
