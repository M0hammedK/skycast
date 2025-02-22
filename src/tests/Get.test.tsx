import axios from "axios";
import { GetWeatherCurrent, GetWeatherForecast } from "../server/Get"

jest.mock("axios");

describe("Weather API functions", () => {
  const mockWeatherData = {
    location: {
      name: "المكلا اليمن",
      region: "Hadramawt",
      country: "Yemen",
    },
    current: {
      condition: {
        text: "Clear",
        icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
      },
      temp_c: 22.8,
      feelslike_c: 24.9,
    },
    forecast: {
      forecastday: [
        {
          date: "2025-02-15",
          day: { maxtemp_c: 25, mintemp_c: 20, condition: { text: "Sunny" } },
        },
      ],
    },
  };

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should fetch current weather data successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

    const data = await GetWeatherCurrent("المكلا اليمن");

    expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_URL_API_URL}/current.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: "المكلا اليمن",
        lang: "ar",
      },
    });
    expect(data).toEqual(mockWeatherData);
  });

  it("should return null if there is an error in GetWeatherCurrent", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const data = await GetWeatherCurrent("المكلا اليمن");

    expect(data).toBeNull();
  });

  it("should fetch weather forecast successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

    const forecast = await GetWeatherForecast("المكلا اليمن");

    expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_URL_API_URL}/forecast.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: "المكلا اليمن",
        lang: "ar",
      },
    });

  });
});
