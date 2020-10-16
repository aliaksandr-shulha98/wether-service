import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Weather} from '../entities/weather';
import {Location} from '../entities/location';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weather: Weather;
  location: Location;
  constructor(private weatherService: WeatherService,
              private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getLocation()
      .subscribe((location) => {
        this.location = location;
        this.weatherService.getWeather(String(location.lat), String(location.lon))
          .subscribe((weather: any) => this.weather = new Weather(weather));
      }
    );
  }

}
