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
