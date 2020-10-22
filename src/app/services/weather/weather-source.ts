import {Weather} from '../../interfaces/weather';
import {Location} from '../../interfaces/location';
import {Observable} from 'rxjs';

export interface WeatherSource {
  getWeatherResponse(location: Location): Observable<any>;
  extractWeather(response: any): Weather;
}
