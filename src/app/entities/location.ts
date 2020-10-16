export class Location {
  public city: string;
  public lat: number;
  public lon: number;

  constructor(city: string, lat: number, lon: number) {
    this.city = city;
    this.lat = lat;
    this.lon = lon;
  }
}
