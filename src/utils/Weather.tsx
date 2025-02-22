import { AxiosResponse } from "axios";
import WeatherSchema from "../models/Weather";
import WeatherStateSchema from "../models/WeatherDay";
import ForecastSchema from "../models/Forecast";
import ForecastHourSchema from "../models/ForecastHour";
import ForecastAstroSchema from "../models/ForecastAstro";
import ForecastDaySchema from "../models/ForecasDaySchema";

export default class WeatherUtils {
  public static WeatherStateToModel(res: any): WeatherStateSchema {
    const weatherDay: WeatherStateSchema = new WeatherStateSchema();
    weatherDay.conditionText = res["condition"]["text"];
    weatherDay.conditionIcon = res["condition"]["icon"];
    weatherDay.windMPH = res["wend_mph"];
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
    weather.state = this.WeatherStateToModel(res.data["current"]);
    return weather;
  }

  public static ForecastsHourToModel(res: any): ForecastHourSchema[] {
    let listForecastHour: ForecastHourSchema[] = [];
    res.map((data: any) => {
      const forecastHour: ForecastHourSchema = new ForecastHourSchema();
      forecastHour.hour = this.WeatherStateToModel(data);
      listForecastHour.push(forecastHour);
    });
    return listForecastHour;
  }

  public static ForecastsAstroToModel(res: any): ForecastAstroSchema {
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

  public static ForecastsDayToModel(res: any): ForecastDaySchema {
    const forecastDay: ForecastDaySchema = new ForecastDaySchema();
    forecastDay.minTempF = res["mintemp_f"];
    forecastDay.minTempC = res["mintemp_c"];
    forecastDay.maxTempF = res["maxtemp_f"];
    forecastDay.maxTempC = res["maxtemp_c"];
    forecastDay.avgTempF = res["avgtemp_f"];
    forecastDay.avgTempC = res["avgtemp_c"];
    forecastDay.changceOfRain = res["daily_chance_of_rain"];
    forecastDay.changceOfSnow = res["daily_will_it_snow"];
    forecastDay.avgHumidity = res["avghumidity"];
    forecastDay.maxWind_KPH = res["maxwind_kph"];
    forecastDay.maxWind_MPH = res["maxwind_mph"];
    forecastDay.conditionText = res["condition"]["text"];
    forecastDay.conditionIcon = res["condition"]["icon"];
    forecastDay.UV = res["uv"];
    return forecastDay;
  }

  public static ForecastsToModel(
    res: AxiosResponse<any, any>
  ): ForecastSchema[] {
    const forecasts: ForecastSchema[] = [];
    res.data["forecast"]["forecastday"].map((day: any) => {
      const forecast: ForecastSchema = new ForecastSchema();

      forecast.date = day["date"];
      forecast.dateEpoch = day["date_epoch"];
      forecast.astro = this.ForecastsAstroToModel(day["astro"]);
      forecast.hours = this.ForecastsHourToModel(day["hour"]);
      forecast.day = this.ForecastsDayToModel(day["day"]);
      forecasts.push(forecast);
    });
    return forecasts;
  }
}
