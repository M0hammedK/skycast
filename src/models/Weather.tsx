import ForecastSchema from "./Forecast";
import WeatherStateSchema from "./WeatherDay";
export default class WeatherSchema {
  public name: string | undefined;
  public region: string | undefined;
  public country: string | undefined;
  public localtime: string | undefined;
  public lastUpdated: string | undefined;
  public state: WeatherStateSchema | undefined;
  public forecat: ForecastSchema | undefined;
}
