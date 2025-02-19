// Import necessary modules
import axios from "axios";
import { GetWeatherCurrent, GetWeatherForecast } from "./Get"

// Mock axios
jest.mock("axios");

describe("Weather API functions", () => {
  const mockWeatherData = {
    location: {
      name: "Al Mukalla",
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
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it("should fetch current weather data successfully", async () => {
    // Arrange: Mock axios to return mockWeatherData
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

    // Act: Call the function
    const data = await GetWeatherCurrent("Al Mukalla");

    // Assert: Check the returned data
    expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_URL_API_URL}/current.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: "Al Mukalla",
        lang: "ar",
      },
    });
    expect(data).toEqual(mockWeatherData);
  });

  it("should return null if there is an error in GetWeatherCurrent", async () => {
    // Arrange: Mock axios to reject with an error
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    // Act: Call the function
    const data = await GetWeatherCurrent("Al Mukalla");

    // Assert: Check if the function returns null on error
    expect(data).toBeNull();
  });

  it("should fetch weather forecast successfully", async () => {
    // Arrange: Mock axios to return mockWeatherData
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

    // Act: Call the function
    const forecast = await GetWeatherForecast("Al Mukalla");

    // Assert: Ensure axios was called with correct params
    expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_URL_API_URL}/forecast.json`, {
      method: "GET",
      params: {
        key: `${process.env.WEATHER_SERVER_KEY}`,
        q: "Al Mukalla",
        lang: "ar",
      },
    });

    // Additional assertions can be added to ensure correct parsing
  });
});
