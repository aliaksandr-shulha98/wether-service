import {Component, OnInit} from '@angular/core';
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
  weather: Weather;
  location: Location;

  constructor(private weatherService: WeatherService,
              private locationService: LocationService,
              private weatherStorageService: WeatherStorageService) {
  }

  changeLocation(event: any): void {
    const location: Location = {
      city: event.suggestion.name,
      lon: event.suggestion.latlng.lng,
      lat: event.suggestion.latlng.lat
    };
    this.setWeather(location);
  }

  ngOnInit(): void {
    this.locationService.getCurrentLocation()
      .subscribe((location: any) =>
      {
        this.location = {city: location.city, lat: location.loc.split(',')[0], lon: location.loc.split(',')[1]};
        this.setWeather(this.location);
      });
  }

  setWeather(location: Location): void {
    this.weather = this.weatherStorageService.getStored(location);
    if (!this.weather) {
      this.weatherService.getWeatherResponse(location)
        .subscribe((res) => {
          this.weather = this.weatherService.extractWeather(res);
          this.weatherStorageService.setStored(location, this.weather);
        });
    }
    console.log(this.weather);
  }
}
