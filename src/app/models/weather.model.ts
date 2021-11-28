export interface WeatherLocation {
    id: string,
    name: string,
}

export interface Forecast {
    date:string,
    day: {
        icon:number,
        iconPhrase: string
    },
    night:{
        icon:number,
        iconPhrase: string
    },
    tempMin: number,
    tempMax: number,
}