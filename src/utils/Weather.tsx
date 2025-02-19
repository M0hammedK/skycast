import { AxiosResponse } from "axios";
import WeatherSchema from "../models/Weather";
import WeatherDaySchema from "../models/WeatherDay";
import ForecastSchema from "../models/Forecast";
import ForecastHourSchema from "../models/ForecastHour";
import ForecastAstroSchema from "../models/ForecastAstro";

export default class WeatherUtils {
  public static WeatherDayToModel(res: any): WeatherDaySchema {
    const weatherDay: WeatherDaySchema = new WeatherDaySchema();
    weatherDay.conditionText = res["condition"]["text"];
    weatherDay.conditionicon = res["condition"]["icon"];
    weatherDay.wendMPH = res["wend_mph"];
    weatherDay.cloud = res["cloud"];
    weatherDay.humidity = res["humidity"];
    weatherDay.tempC = res["heatindex_c"] || res["temp_c"];
    weatherDay.tempF = res["heatindex_f"] || res["temp_f"];
    weatherDay.feelsLikeC = res["feelslike_c"];
    weatherDay.feelsLikeF = res["feelslike_f"];
    weatherDay.lastUpdated = res["last_updated"] || res["time"];
    return weatherDay;
  }

  public static WeatherToModel(res: AxiosResponse<any, any>): WeatherSchema {
    const weather: WeatherSchema = new WeatherSchema();
    weather.name = res.data["location"]["name"];
    weather.region = res.data["location"]["region"];
    weather.country = res.data["location"]["country"];
    weather.localtime = res.data["location"]["localtime"];
    weather.lastUpdated = res.data["location"]["last_updated"];
    weather.day = this.WeatherDayToModel(res.data["current"]);
    return weather;
  }

  public static ForecastHourToModel(res: any): ForecastHourSchema[] {
    let listForecastHour: ForecastHourSchema[] = [];
    res.map((data: any) => {
      const forecastHour: ForecastHourSchema = new ForecastHourSchema();
      forecastHour.day = this.WeatherDayToModel(data);
      listForecastHour.push(forecastHour);
    });
    return listForecastHour;
  }

  public static ForecastAstroToModel(res: any): ForecastAstroSchema {
    const forecastAstro: ForecastAstroSchema = new ForecastAstroSchema();
    forecastAstro.isMoonUp = res["is_moon_up"];
    forecastAstro.isSunUp = res["is_sun_up"];
    forecastAstro.moonPhase = res["moon_phase"];
    forecastAstro.moonRise = res["moonrise"];
    forecastAstro.moonSet = res["moonset"];
    forecastAstro.sunRise = res["sunrise"];
    forecastAstro.sunSet = res["sunset"];
    return forecastAstro;
  }

  public static ForecastToModel(res: AxiosResponse<any, any>): ForecastSchema {
    const forecast: ForecastSchema = new ForecastSchema();
    forecast.data = res.data["forecast"]["forecastday"]["0"]["date"];
    forecast.astro = this.ForecastAstroToModel(
      res.data["forecast"]["forecastday"]["0"]["astro"]
    );
    forecast.hour = this.ForecastHourToModel(
      res.data["forecast"]["forecastday"]["0"]["hour"]
    );
    return forecast;
  }
}
