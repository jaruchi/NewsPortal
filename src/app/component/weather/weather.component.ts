import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather: any;
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //debugger
    navigator.geolocation.getCurrentPosition(position => {
      this.findWeather(position.coords.latitude,position.coords.longitude);
      
    });
    
  }

   findWeather(latitude:number,longitude:number): any {
    this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=052f26926ae9784c2d677ca7bc5dec98`
      )
      .subscribe((response) => (this.weather = response));
  }
}
