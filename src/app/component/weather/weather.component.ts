import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather: any;
  location: any = 'Aurora';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.findWeather(this.location);
  }

   findWeather(location: any): any {
    this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=052f26926ae9784c2d677ca7bc5dec98&&units=imperial`
      )
      .subscribe((response) => (this.weather = response));
  }
}
