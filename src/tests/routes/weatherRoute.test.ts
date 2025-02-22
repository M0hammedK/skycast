/**
 * @jest-environment node
 */

import { GET } from '../../app/api/weather/route';
import { GetWeatherForecast } from '@/src/server/Get';

jest.mock('../../server/Get', () => ({
  GetWeatherForecast: jest.fn(),
}));

describe('Weather API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createRequest = (city?: string) => {
    const url = new URL('http://localhost/api/weather');
    if (city) url.searchParams.set('city', city);
    return new Request(url.toString());
  };

  it('should return weather data for specified city', async () => {
    const mockData = { temperature: 25, city: 'al mukalla' };
    (GetWeatherForecast as jest.Mock).mockResolvedValue(mockData);

    const response = await GET(createRequest('al mukalla'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
    expect(GetWeatherForecast).toHaveBeenCalledWith('al mukalla');
  });

  it('should handle API errors', async () => {
    (GetWeatherForecast as jest.Mock).mockRejectedValue(new Error('API Error'));

    const response = await GET(createRequest('invalid-city'));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: 'Internal Server Error' });
  });
});