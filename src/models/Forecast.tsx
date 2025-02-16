import ForecastHourSchema from "./ForecastHour";

class ForecastSchema{
public data: Date | undefined;
public astro: any | undefined;
public hour: ForecastHourSchema | undefined;
}
export default ForecastSchema
