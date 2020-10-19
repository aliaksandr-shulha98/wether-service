import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Weather} from '../entities/weather';
import {Location} from '../entities/location';
import {LocationService} from '../services/location.service';
import {WeatherStorageService} from '../services/weather-storage.service';

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
    this.setWeather(new Location(event.suggestion.name));
  }

  ngOnInit(): void {
    this.locationService.getLocation()
      .subscribe((location) => this.setWeather(location));
  }

  setWeather(location: Location): void {
    this.location = location;
    this.weather = this.weatherStorageService.getStored(location);
    if (!this.weather){
      this.weatherService.getWeather(location.city)
        .subscribe((weather: any) => {
          this.weather = new Weather(weather);
          this.weatherStorageService.setStored(location, this.weather);
        });
    }
  }
}
