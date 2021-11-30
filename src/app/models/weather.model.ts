export interface WeatherLocation {
  id: string;
  name: string;
}

export interface Forecast {
  date: string;
  icon: number;
  iconPhrase: string;
  tempMin: number;
  tempMax: number;
}
