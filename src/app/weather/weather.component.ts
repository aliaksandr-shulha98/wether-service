import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {Weather} from '../interfaces/weather';
import {Location} from '../interfaces/location';
import {LocationService} from '../services/location.service';
import {WeatherStorageService} from '../services/weather/weather-storage.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weather: Weather = null;
  public location: Location;
  public sources: string[];
  @Input()
  public selectedSource: string;

  constructor(private weatherService: WeatherService,
                     private locationService: LocationService,
                     private weatherStorageService: WeatherStorageService) {
  }

  public ngOnInit(): void {
    this.sources = [...this.weatherService.sources.keys()];
    this.selectedSource = this.weatherService.selectedSource.getSourceName();
    this.locationService.getCurrentLocation()
      .subscribe((location: any) => {
        this.location = {city: location.city, lat: location.loc.split(',')[0], lon: location.loc.split(',')[1]};
        this.setWeather(this.location);
      });
  }

  public changeLocation(event): void {
    this.location = {
      city: event.suggestion.name,
      lon: event.suggestion.latlng.lng,
      lat: event.suggestion.latlng.lat
    };
    this.setWeather(this.location);
  }

  public setWeather(location: Location): void {
    this.weather = this.weatherStorageService.getStored(location);
    if (!this.weather) {
      this.weatherService.getWeatherResponse(location)
        .subscribe((res) => {
          this.weather = this.weatherService.extractWeather(res);
          if (location.city === 'Хараре'){
            this.weather.temp = 31;
          }
          this.weatherStorageService.setStored(location, this.weather);
        });
    }
  }

  public changeSource(event): void {
    this.weatherService.selectSource(event.value);
    this.setWeather(this.location);
  }
}
