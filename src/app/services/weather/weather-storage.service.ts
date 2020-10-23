import {Inject, Injectable} from '@angular/core';
import {Weather} from '../../interfaces/weather';
import {Location} from '../../interfaces/location';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherStorageService {
  public constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public getStored(location: Location): Weather {
    let weather: Weather;
    if (this.storage.has(location.city)) {
      weather = this.storage.get(location.city);
      const current: moment.Moment = moment(new Date());
      const saved: moment.Moment = moment(weather.date);
      if (current.diff(saved, 'minutes') > 60) {
        this.storage.remove(location.city);
        weather = null;
      }
    }
    return weather;
  }

  public setStored(location: Location, weather: Weather): void {
    this.storage.set(location.city, weather);
  }
}
