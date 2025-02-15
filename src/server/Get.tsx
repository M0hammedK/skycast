import axios from "axios";
import WeatherSchema from "../models/Weather";

export async function GetWeatherCurrent(
  City: string = "Al Mukalla"
): Promise<WeatherSchema> {
  let weather: WeatherSchema = new WeatherSchema();
  const res = await axios
    .get(`${process.env.NEXT_URL_WEATHER_SEREVER}/current.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: `${City}`,
        lang: "ar",
      },
    })
    .then((res) => {
      weather.name = res.data["location"]["name"];
      weather.region = res.data["location"]["region"];
      weather.country = res.data["location"]["country"];
      weather.localtime = res.data["location"]["localtime"];
      weather.lastUpdated = res.data["location"]["last_updated"];
      weather.conditionText = res.data["current"]["condition"]["text"];
      weather.conditionicon = res.data["current"]["condition"]["icon"];
      weather.wendMPH = res.data["current"]["wend_mph"];
      weather.cloud = res.data["current"]["cloud"];
      weather.humidity = res.data["current"]["humidity"];
      weather.heatIndexC = res.data["current"]["heatindex_c"];
      weather.heatIndexF = res.data["current"]["heatindex_f"];
      weather.feelsLikeC = res.data["current"]["feelslike_c"];
      weather.feelsLikeF = res.data["current"]["feelslike_f"];
    })
    .catch((err: any) => {
      console.log(err);
    });
  return weather!;
}

export async function GetWeatherForecast(
  City: string = "Al Mukalla"
): Promise<WeatherSchema> {
  let weather: WeatherSchema = new WeatherSchema();
  const res = await axios
    .get(`${process.env.NEXT_URL_WEATHER_SEREVER}/forecast.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: `${City}`,
        lang: "ar",
      },
    })
    .then((res) => {
      console.log(res.data['forecast']);
      //   weather.name = res.data["location"]["name"];
      //   weather.region = res.data["location"]["region"];
      //   weather.country = res.data["location"]["country"];
      //   weather.localtime = res.data["location"]["localtime"];
      //   weather.lastUpdated = res.data["location"]["last_updated"];
      //   weather.conditionText = res.data["current"]["condition"]["text"];
      //   weather.conditionicon = res.data["current"]["condition"]["icon"];
      //   weather.wendMPH = res.data["current"]["wend_mph"];
      //   weather.cloud = res.data["current"]["cloud"];
      //   weather.humidity = res.data["current"]["humidity"];
      //   weather.heatIndexC = res.data["current"]["heatindex_c"];
      //   weather.heatIndexF = res.data["current"]["heatindex_f"];
      //   weather.feelsLikeC = res.data["current"]["feelslike_c"];
      //   weather.feelsLikeF = res.data["current"]["feelslike_f"];
    })
    .catch((err: any) => {
      console.log(err);
    });
  return weather!;
}
// {
//     location: {
//       name: 'Al Mukalla',
//       region: 'Hadramawt',
//       country: 'Yemen',
//       lat: 14.53,
//       lon: 49.1314,
//       tz_id: 'Asia/Aden',
//       localtime_epoch: 1739632288,
//       localtime: '2025-02-15 18:11'
//     },
//     current: {
//       last_updated_epoch: 1739631600,
//       last_updated: '2025-02-15 18:00',
//       temp_c: 22.8,
//       temp_f: 73.1,
//       is_day: 0,
//       condition: {
//         text: 'Clear',
//         icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
//         code: 1000
//       },
//       wind_mph: 4.3,
//       wind_kph: 6.8,
//       wind_degree: 89,
//       wind_dir: 'E',
//       pressure_mb: 1014,
//       pressure_in: 29.95,
//       precip_mm: 0,
//       precip_in: 0,
//       humidity: 67,
//       cloud: 0,
//       feelslike_c: 24.9,
//       feelslike_f: 76.8,
//       windchill_c: 22.8,
//       windchill_f: 73.1,
//       heatindex_c: 24.9,
//       heatindex_f: 76.8,
//       dewpoint_c: 16.4,
//       dewpoint_f: 61.6,
//       vis_km: 10,
//       vis_miles: 6,
//       uv: 0,
//       gust_mph: 5.4,
//       gust_kph: 8.7
//     },
//     forecast: { forecastday: [ [Object] ] }
//   }
