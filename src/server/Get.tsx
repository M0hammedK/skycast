import axios from "axios";
import WeatherSchema from "../models/Weather";
import ForecastSchema from "../models/Forecast";
import WeatherUtils from "../utils/Weather";

export async function GetWeatherCurrent(City: string): Promise<any> {
  let data;
  await axios
    .get(`${process.env.NEXT_URL_API_URL}/current.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: `${City}`,
        lang: "ar",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err: any) => {
      data = null;
    });
  return data;
}

export async function GetWeatherForecast(
  City: string
): Promise<any> {
  let data;
  const res = await axios
    .get(`${process.env.NEXT_URL_API_URL}/forecast.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: `${City}`,
        lang: "ar",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err: any) => {
      data = null;
    });
  return data!;
}
