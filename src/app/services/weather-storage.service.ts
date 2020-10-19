import {Inject, Injectable} from '@angular/core';
import {Weather} from '../entities/weather';
import {Location} from '../entities/location';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class WeatherStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  getStored(location: Location): Weather {
    let weather: Weather;
    console.log(moment('2020-08-04 18:00:00').format('yyyy-MM-DD'));
    if (this.storage.has(location.city)){
      weather = this.storage.get(location.city);
      const current: moment.Moment = moment(new Date());
      const saved: moment.Moment = moment(weather.date);
      if (current.diff(saved, 'minutes') > 60){
        this.storage.remove(location.city);
        weather = null;
      }
    }
    return weather;
  }

  setStored(location: Location, weather: Weather): void{
    this.storage.set(location.city, weather);
  }
}
