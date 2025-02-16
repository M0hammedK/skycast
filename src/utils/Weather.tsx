import { AxiosResponse } from "axios";
import WeatherSchema from "../models/Weather";

export default class WeatherUtils {

  public static WeatherToModel(res:AxiosResponse<any, any>): WeatherSchema {
    const weather: WeatherSchema = new WeatherSchema();
    console.log(res)
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
    return weather;
  }

  public static ModelTpWeather() {}
}


