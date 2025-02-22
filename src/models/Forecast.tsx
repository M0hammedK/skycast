import ForecastDaySchema from "./ForecasDaySchema";
import ForecastAstroSchema from "./ForecastAstro";
import ForecastHourSchema from "./ForecastHour";
import WeatherDaySchema from "./WeatherDay";

class ForecastSchema {
  public date: string | undefined;
  public dateEpoch: string | undefined;
  public astro: ForecastAstroSchema | undefined;
  public day: ForecastDaySchema | undefined;
  public hours: ForecastHourSchema[] | undefined;
}
export default ForecastSchema;
