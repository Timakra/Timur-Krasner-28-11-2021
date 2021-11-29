import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, first ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forecast } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  
  apiKey : string = 'za4SnYpMCBtMaTGRcd4WTZIllvJrOWLw';
  baseUrl : string = 'http://dataservice.accuweather.com/'
  headers : HttpHeaders = new HttpHeaders()

  constructor(
    private http : HttpClient
    ){}

  getCurrentWeather(id:string){
    return of([
      {
        "LocalObservationDateTime": "2021-11-29T10:41:00+02:00",
        "EpochTime": 1638175260,
        "WeatherText": "Mostly sunny",
        "WeatherIcon": Math.round(1 + 8 * Math.random()),
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
          "Metric": {
            "Value": Math.round(30 * Math.random()),
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 75,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    ]).pipe(
      map((res):Forecast=>{
        let forecastData = res[0];
        return {
          date: Date.now().toString(),
          icon: forecastData.WeatherIcon,
          iconPhrase : forecastData.WeatherText,
          tempMax: forecastData.Temperature.Metric.Value,
          tempMin: forecastData.Temperature.Metric.Value
        }
      })
    )
    //return this.http.get(`${this.baseUrl}/currentconditions/v1  /${id}?apikey=${this.apiKey}`)

  }

  getWeatherFiveDayForecast( id:string ){
    return of({
  "Headline": {
    "EffectiveDate": "2021-12-01T07:00:00+02:00",
    "EffectiveEpochDate": 1638334800,
    "Severity": 5,
    "Text": "Expect showers Wednesday",
    "Category": "rain",
    "EndDate": "2021-12-01T19:00:00+02:00",
    "EndEpochDate": 1638378000,
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
  },
  "DailyForecasts": [
    {
      "Date": "2021-11-28T07:00:00+02:00",
      "EpochDate": 1638075600,
      "Temperature": {
        "Minimum": {
          "Value": 17,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 25.5,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
    },
    {
      "Date": "2021-11-29T07:00:00+02:00",
      "EpochDate": 1638162000,
      "Temperature": {
        "Minimum": {
          "Value": 20.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 27,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
    },
    {
      "Date": "2021-11-30T07:00:00+02:00",
      "EpochDate": 1638248400,
      "Temperature": {
        "Minimum": {
          "Value": 21,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 27.4,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 6,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 38,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
    },
    {
      "Date": "2021-12-01T07:00:00+02:00",
      "EpochDate": 1638334800,
      "Temperature": {
        "Minimum": {
          "Value": 19.1,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 21.3,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 7,
        "IconPhrase": "Cloudy",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Light"
      },
      "Night": {
        "Icon": 36,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
    },
    {
      "Date": "2021-12-02T07:00:00+02:00",
      "EpochDate": 1638421200,
      "Temperature": {
        "Minimum": {
          "Value": 15.7,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 20.9,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
    }
  ]
    }).pipe(
      map((forecast:any)=>{
        return forecast.DailyForecasts.map((dailyForecast:any):Forecast=>{
          return {
            date:dailyForecast.Date,
            icon: dailyForecast.Day.Icon ,
            iconPhrase:dailyForecast.Day.IconPhrase,
            tempMin: dailyForecast.Temperature.Minimum.Value,
            tempMax: dailyForecast.Temperature.Maximum.Value,
          }
      })
      })
  )
    //return this.http.get(`${this.baseUrl}/forecasts/v1/daily/5day/${id}?apikey=${this.apiKey}`)
  }

  getAutoComplete(query: string) :Observable<any>{
    return of([
      {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
          "ID": "IL",
          "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
          "ID": "TA",
          "LocalizedName": "Tel Aviv"
        }
      },
      {
        "Version": 1,
        "Key": "3431644",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Telanaipura",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JA",
          "LocalizedName": "Jambi"
        }
      },
      {
        "Version": 1,
        "Key": "300558",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Telok Blangah New Town",
        "Country": {
          "ID": "SG",
          "LocalizedName": "Singapore"
        },
        "AdministrativeArea": {
          "ID": "05",
          "LocalizedName": "South West"
        }
      },
      {
        "Version": 1,
        "Key": "325876",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telford",
        "Country": {
          "ID": "GB",
          "LocalizedName": "United Kingdom"
        },
        "AdministrativeArea": {
          "ID": "TFW",
          "LocalizedName": "Telford and Wrekin"
        }
      },
      {
        "Version": 1,
        "Key": "169072",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telavi",
        "Country": {
          "ID": "GE",
          "LocalizedName": "Georgia"
        },
        "AdministrativeArea": {
          "ID": "KA",
          "LocalizedName": "Kakheti"
        }
      },
      {
        "Version": 1,
        "Key": "230611",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telsiai",
        "Country": {
          "ID": "LT",
          "LocalizedName": "Lithuania"
        },
        "AdministrativeArea": {
          "ID": "TE",
          "LocalizedName": "Telšiai"
        }
      },
      {
        "Version": 1,
        "Key": "2723742",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telégrafo",
        "Country": {
          "ID": "BR",
          "LocalizedName": "Brazil"
        },
        "AdministrativeArea": {
          "ID": "PA",
          "LocalizedName": "Pará"
        }
      },
      {
        "Version": 1,
        "Key": "186933",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Tela",
        "Country": {
          "ID": "HN",
          "LocalizedName": "Honduras"
        },
        "AdministrativeArea": {
          "ID": "AT",
          "LocalizedName": "Atlántida"
        }
      },
      {
        "Version": 1,
        "Key": "3453754",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telaga Asih",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JB",
          "LocalizedName": "West Java"
        }
      },
      {
        "Version": 1,
        "Key": "3453755",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telagamurni",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JB",
          "LocalizedName": "West Java"
        }
      }
    ])// mock response
    
    // return this.http.get(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${query}`)
  }

}
