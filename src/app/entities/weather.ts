export class Weather{
  temp: number;
  feelsLike: number;
  pressure: bigint;
  humidity: bigint;
  windSpeed: number;
  description: string;
  date: number;
  constructor(response: any) {
    this.temp = response.main.temp;
    this.feelsLike = response.main.feels_like;
    this.pressure = response.main.pressure;
    this.humidity = response.main.humidity;
    this.windSpeed = response.wind.speed;
    this.description = response.weather[0].description;
    this.date = Date.now();
  }
}
