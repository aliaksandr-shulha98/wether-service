import {Injectable} from '@angular/core';
import {WeatherSource} from './weather-source';
import {Location} from '../../interfaces/location';
import {Weather} from '../../interfaces/weather';
import {Observable} from 'rxjs';
import {OpenWeatherSourceService} from './open-weather-source.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  selectedSource: WeatherSource;
  constructor(private openWeatherSource: OpenWeatherSourceService) {
    this.selectedSource = openWeatherSource;
  }

  getWeatherResponse(location: Location): Observable<any> {
    console.log(location);
    return this.selectedSource.getWeatherResponse(location);
  }

  extractWeather(res: any): Weather {
    return this.selectedSource.extractWeather(res);
  }

  setSource(type: string): void {
  }
}
