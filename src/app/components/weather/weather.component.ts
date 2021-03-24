import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { WeatherService } from 'src/app/services/weather.service';
import { IWeatherData } from 'src/app/models/weater-data.interface';
import { UnitsType } from 'src/app/models/units.enum';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  validUnitsEnum: { [key: string]: UnitsType; } = {
    ['standard']: UnitsType.STANDARD,
    ['imperial']: UnitsType.IMPERIAL,
    ['metric']: UnitsType.METRIC,
 };
  validUnits = ['standard', 'metric', 'imperial'];
  citiesList= ['Florida', 'South Dakota', 'Tennessee', 'Michigan', 'tel-aviv']
  selectedWethearCities = [] as IWeatherData[];
  unitsType = UnitsType;
  selectedUnitsDictionary = {} as { [index: number]: string };

  ngOnInit(): void {
    this.addCity();
  }

  cityWeatherForm: FormGroup;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.cityWeatherForm = this.fb.group({
      cities: this.fb.array([]),
    });
  }

  get cities(): FormArray {
    return this.cityWeatherForm.get("cities") as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      cityName: ['', [Validators.required]],
      units: '',
    })
  }

  addCity() {
    if (!this.cities.valid) {
      return;
    }
    this.cities.valid ? this.cities.push(this.newSkill()) : this.cities.markAsTouched;
  }

  getWeatherData(index: number, city: string, units?: string) {
    this.weatherService.getWeather(city, units).subscribe(
      (res:IWeatherData) => {
        this.selectedWethearCities[index] = res as IWeatherData;
      }
    )
  }

  textChangeHandler(index: number) {
    if (!this.cities.controls[index].valid)
      return;
    const city = this.cities.controls[index].value['cityName'];
    const units = this.cities.controls[index].value['units'];
    if (units && this.validUnits.includes(units))
      this.selectedUnitsDictionary[index] = units;
    else
      this.selectedUnitsDictionary[index] = 'standard'
    this.getWeatherData(index, city, units);

  }
}
