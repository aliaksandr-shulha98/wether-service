import {Injectable} from '@angular/core';
import {WeatherSource} from './weather-source';
import {Location} from '../../interfaces/location';
import {Weather} from '../../interfaces/weather';
import {Observable} from 'rxjs';
import {OpenWeatherSourceService} from './open-weather-source.service';
import {WeatherbitSourceService} from './weatherbit-source.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public sources: Map<string, WeatherSource>;
  public selectedSource: WeatherSource;

  public constructor(private openWeatherSource: OpenWeatherSourceService,
                     private weatherbitSource: WeatherbitSourceService) {
    this.selectedSource = openWeatherSource;
    this.sources = new Map<string, WeatherSource>()
      .set(openWeatherSource.getSourceName(), openWeatherSource)
      .set(weatherbitSource.getSourceName(), weatherbitSource);
  }

  public getWeatherResponse(location: Location): Observable<any> {
    this.selectedSource.getWeatherResponse(location).subscribe(data => console.log(data));
    return this.selectedSource.getWeatherResponse(location);
  }

  public extractWeather(res: any): Weather {
    return this.selectedSource.extractWeather(res);
  }

  public selectSource(name: string): void {
    this.selectedSource = this.sources.get(name);
  }
}
