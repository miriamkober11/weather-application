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

  validUnits = ['standard', 'metric', 'imperial'];
  // validUnitsEnum = [['standard']:'UnitsType.STANDARD[[]];
  validUnitsEnum = { ['standard']: UnitsType.STANDARD, ['imperial']: UnitsType.IMPERIAL, ['metric']: UnitsType.METRIC }

  cities: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan', 'tel-aviv']
  selectedWethearCities = [] as IWeatherData[];
  unitsTypeKeyEnum = UnitsType;
  unitsType = UnitsType;
  selectedUnitsDictionary = {} as { [index: number]: string };

  ngOnInit(): void {
    this.addCity();
  }

  cityWeatherForm: FormGroup;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.cityWeatherForm = this.fb.group({
      skills: this.fb.array([]),
    });
  }

  get skills(): FormArray {
    return this.cityWeatherForm.get("skills") as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      cityName: ['', [Validators.required]],
      units: '',
    })
  }

  addCity() {
    if (!this.skills.valid) {
      return;
    }
    this.skills.valid ? this.skills.push(this.newSkill()) : this.skills.markAsTouched;
  }

  getWeatherData(index: number, city?: string, units?: string) {
    this.weatherService.getWeather(city, units).subscribe(
      (res:IWeatherData) => {
        this.selectedWethearCities[index] = res as IWeatherData;
      }
    )
  }

  textChangeHandler(index: number) {
    if (!this.skills.controls[index].valid)
      return;
    const city = this.skills.controls[index].value['cityName'];
    const units = this.skills.controls[index].value['units'];
    if (units && this.validUnits.includes(units))
      this.selectedUnitsDictionary[index] = units;
    else
      this.selectedUnitsDictionary[index] = 'standard'
    this.getWeatherData(index, city, units);

  }
}
