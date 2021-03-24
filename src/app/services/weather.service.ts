import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWeather } from '../models/weather.interface';
import { IWeatherData } from '../models/weater-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  appid = "abe1eb51289c21c167c66ce790c2fac3"

  constructor(private http: HttpClient) { }

  getWeather(city?: string, units?: string): Observable<any> {
    return this.http.get(`${this.weatherUrl}?q=${city}&units=${units}&appid=${this.appid}&lang=ua`).pipe(
    //   error=>
    //   retry(1),
    //   catchError(error => { return throwError(error);
    //    })
    // );
    )
  }

}
