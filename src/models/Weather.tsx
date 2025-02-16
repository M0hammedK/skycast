import ForecastSchema from "./Forecast";
import WeatherDaySchema from "./WeatherDay";
export default class WeatherSchema{
  public name: string | undefined;
  public region: string | undefined;
  public country: string | undefined;
  public localtime: Date | undefined;
  public lastUpdated: Date | undefined;
  public day: WeatherDaySchema | undefined;
  public forecat: ForecastSchema | undefined;
}

/*
whole data schema
{
  location: {
    name: 'Al Mukalla',
    region: 'Hadramawt',
    country: 'Yemen',
    lat: 14.53,
    lon: 49.1314,
    tz_id: 'Asia/Aden',
    localtime_epoch: 1739613869,
    localtime: '2025-02-15 13:04'
  },
  current: {
    last_updated_epoch: 1739613600,
    last_updated: '2025-02-15 13:00',
    temp_c: 26,
    temp_f: 78.8,
    is_day: 1,
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      code: 1000
    },
    wind_mph: 9.4,
    wind_kph: 15.1,
    wind_degree: 122,
    wind_dir: 'ESE',
    pressure_mb: 1014,
    pressure_in: 29.94,
    precip_mm: 0,
    precip_in: 0,
    humidity: 51,
    cloud: 0,
    feelslike_c: 26.7,
    feelslike_f: 80.1,
    windchill_c: 26,
    windchill_f: 78.8,
    heatindex_c: 26.7,
    heatindex_f: 80.1,
    dewpoint_c: 15.1,
    dewpoint_f: 59.2,
    vis_km: 10,
    vis_miles: 6,
    uv: 9.1,
    gust_mph: 10.8,
    gust_kph: 17.4
  }
}
*/
