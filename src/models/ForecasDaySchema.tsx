class ForecastDaySchema {
  public maxTempC: string | undefined;
  public maxTempF: string | undefined;
  public minTempC: string | undefined;
  public minTempF: string | undefined;
  public avgTempC: string | undefined;
  public avgTempF: string | undefined;
  public maxWind_MPH: string | undefined;
  public maxWind_KPH: string | undefined;
  public avgHumidity: string | undefined;
  public changceOfRain: string | undefined;
  public changceOfSnow: string | undefined;
  public conditionText: string | undefined;
  public conditionIcon: string | undefined;
  public UV: string | undefined;
}

export default ForecastDaySchema;
