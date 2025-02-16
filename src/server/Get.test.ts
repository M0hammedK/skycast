import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GetWeatherCurrent, GetWeatherForecast } from './Get';
import WeatherSchema from '../models/Weather';

describe('Weather Service Tests', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Reset the mock after each test to ensure no test pollution
  });

  it('should fetch and map current weather data correctly', async () => {
    // Mock API response
    const mockResponse = {
      location: {
        name: 'Al Mukalla',
        region: 'Hadramawt',
        country: 'Yemen',
        localtime: '2025-02-15 18:11',
        last_updated: '2025-02-15 18:00',
      },
      current: {
        condition: {
          text: 'Clear',
          icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
        },
        wind_mph: 4.3,
        cloud: 0,
        humidity: 67,
        heatindex_c: 24.9,
        heatindex_f: 76.8,
        feelslike_c: 24.9,
        feelslike_f: 76.8,
      },
    };

    // Set up mock behavior
    mock
      .onGet(`${process.env.NEXT_URL_WEATHER_SEREVER}/current.json`, {
        params: {
          key: `${process.env.WEATHER_SERVER_KEY}`,
          q: 'Al Mukalla',
          lang: 'ar',
        },
      })
      .reply(200, mockResponse);

    // Call the function
    const result: WeatherSchema = await GetWeatherCurrent('Al Mukalla');

    // Assertions
    expect(result.name).toBe('Al Mukalla');
    expect(result.region).toBe('Hadramawt');
    expect(result.country).toBe('Yemen');
    expect(result.conditionText).toBe('Clear');
    expect(result.conditionicon).toBe('//cdn.weatherapi.com/weather/64x64/night/113.png');
    expect(result.humidity).toBe(67);
    expect(result.feelsLikeC).toBe(24.9);
  });

  it('should handle errors gracefully', async () => {
    // Simulate a network error
    mock.onGet(`${process.env.NEXT_URL_WEATHER_SEREVER}/current.json`).networkError();

    const result: WeatherSchema = await GetWeatherCurrent('Al Mukalla');

    // Assert that the function returns an empty WeatherSchema on error
    expect(result.name).toBe('');
    expect(result.humidity).toBeUndefined();
  });
});
