import ForecastAstroSchema from "./ForecastAstro";
import ForecastHourSchema from "./ForecastHour";

class ForecastSchema{
public data: Date | undefined;
public astro: ForecastAstroSchema | undefined;
public hour: ForecastHourSchema[] | undefined;
}
export default ForecastSchema
