/**
 * @jest-environment node
 */

import { GET } from '../../app/api/weather/route';
import { GetWeatherForecast } from '@/src/server/Get';

jest.mock('../..//server/Get', () => ({
  GetWeatherForecast: jest.fn(),
}));

describe('GET /api/weather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createRequest = (city?: string) => {
    const url = new URL('http://localhost/api/weather');
    if (city) url.searchParams.set('city', city);
    return new Request(url.toString());
  };

  it('should return forecast for specified city', async () => {
    const mockData = { temp: 25, condition: 'Sunny' };
    (GetWeatherForecast as jest.Mock).mockResolvedValue(mockData);

    const response = await GET(createRequest('London'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
  });

  it('should use default city when no parameter provided', async () => {
    const mockData = { temp: 30, condition: 'Clear' };
    (GetWeatherForecast as jest.Mock).mockResolvedValue(mockData);

    await GET(createRequest());
    expect(GetWeatherForecast).toHaveBeenCalledWith('al mukalla');
  });
});