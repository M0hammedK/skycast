import { AxiosResponse } from "axios";
import WeatherSchema from "../models/Weather";
import WeatherDaySchema from "../models/WeatherDay";

export default class WeatherUtils {
  
  public static WeatherDayToModel(res:AxiosResponse<any, any>):WeatherDaySchema {
    const weatherDay: WeatherDaySchema = new WeatherDaySchema();
    console.log(res.data["wend_mph"])
    weatherDay.conditionText = res.data["condition"]["text"];
    weatherDay.conditionicon = res.data["condition"]["icon"];
    weatherDay.wendMPH = res.data["wend_mph"];
    weatherDay.cloud = res.data["cloud"];
    weatherDay.humidity = res.data["humidity"];
    weatherDay.tempC = res.data["heatindex_c"];
    weatherDay.tempF = res.data["heatindex_f"];
    weatherDay.feelsLikeC = res.data["feelslike_c"];
    weatherDay.feelsLikeF = res.data["feelslike_f"];

    return weatherDay
  }

  public static WeatherToModel(res:AxiosResponse<any, any>): WeatherSchema {
    const weather: WeatherSchema = new WeatherSchema();
    weather.name = res.data["location"]["name"];
    weather.region = res.data["location"]["region"];
    weather.country = res.data["location"]["country"];
    weather.localtime = res.data["location"]["localtime"];
    weather.lastUpdated = res.data["location"]["last_updated"];
    weather.day = this.WeatherDayToModel(res.data['current'])
    return weather;
  }

  public static ForecastHourToModel(res:AxiosResponse<any, any>) {}
  
  public static ForecastToModel(res:AxiosResponse<any, any>) {}

}


