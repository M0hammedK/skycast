class WeatherDaySchema {
  public conditionText: string | undefined;
  public conditionicon: string | undefined;
  public wendMPH: string | undefined;
  public cloud: string | undefined;
  public humidity: string | undefined;
  public tempC: string | undefined;
  public tempF: string | undefined;
  public feelsLikeC: string | undefined;
  public feelsLikeF: string | undefined;
  public lastUpdated: string | undefined;
}

export default WeatherDaySchema;
